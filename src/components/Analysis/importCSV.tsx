import React, { useState } from "react";
import {
  DeleteOutlined,
  FileExcelOutlined,
  QuestionCircleTwoTone,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  MenuProps,
  Modal,
  Progress,
  Row,
  Space,
  Table,
  Tag,
  theme,
} from "antd";
import type { NextPage } from "next";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import Papa from "papaparse";
import { useSession } from "next-auth/react";
import BACKEND_URL from '../../constants/url'

const { Content, Footer, Sider } = Layout;

const ImportCSV: NextPage = () => {
  const [fileCSV, setfileCSV] = useState<any>([
    { name: "", data: [{ Text: "" }] },
  ]);
  const [loadfileCSV, setloadfileCSV] = useState<any>([
    { name: "", data: [{ Text: "" }] },
  ]);
  const [datafilecsv, setdatafilecsv] = useState<any>([]);
  const [dataAPI, setdataAPI] = useState<any>([]);
  const textArray: { Text: string }[] = [];
  let [selectCSV, setselectCSV] = useState<number>(1);
  const [positivePercentage, setpositivePercentage] = useState<any>(0);
  const [neutralPercentage, setneutralPercentage] = useState<any>(0);
  const [negativePercentage, setnegativePercentage] = useState<any>(0);
  const { data: session } = useSession();
  const [userId, setuserId] = useState("");
  const [filename, setfilename] = useState("");
  const [done, setdone] = useState(false);
  const [dones, setdones] = useState(false);

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      label,
      children,
    } as MenuItem;
  }

  const items2: MenuProps["items"] = [FileExcelOutlined].map((icon, index) => {
    const key = String(index + 1);
    let idx = 0;
    let filenameprev = "";
    let filenamenew = "";
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `Storage .CSV`,
      children: Object.values(datafilecsv).map((value: any, index: any) => {
        if (value.filename === "") {
          return;
        }
        if (value.filename) {
          filenamenew = value.filename;
          if (filenamenew === filenameprev) {
            return;
          } else {
            idx++;
            filenameprev = value.filename;
            return {
              key: idx,
              label: `${filenameprev}`,
            };
          }
        }
      }),
    };
  });

  const mergedItems: any[] = [
    ...items2,
    getItem("Clear all CSV", "-1", <DeleteOutlined />),
  ];

  const items: any[] = mergedItems;

  const handleFileUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const fileContents = event.target.result;
      const parsedData: any = Papa.parse(fileContents, {
        encoding: "utf-8",
        delimiter: ",",
      } as any);

      const adaptedData = parsedData.data
        .slice(0, -1)
        .map((innerArray: any, index: any) => ({
          key: index + 1,
          Text: innerArray[0],
        }));
      setfileCSV([...fileCSV, { name: `${file.name}`, data: adaptedData }]);
      setselectCSV(fileCSV.length);
    };
    reader.readAsText(file, "UTF-8");
  };
  
  async function GetUserId() {
    try {
      const res = await fetch("/api/userId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email as string }),
      });
      const userId = await res.json();
      setuserId(userId.userId);
    } catch (error) {
      console.error(error);
    }
  }

  async function GetfilebyId() {
    try {
      const res = await fetch(`/api/objectcsv?userId=${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const datafile = await res.json();
      setdatafilecsv(datafile);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    if (session) {
      GetUserId();
    }
  }, [session]);

  React.useEffect(() => {
    if (userId) {
      GetfilebyId();
      calculateProps(loadfileCSV[0]);
    }
  }, [userId]);

  React.useEffect(() => {
    let loadfileCSVCopy = [...loadfileCSV]; // Create a copy of loadfileCSV
    Object.values(datafilecsv).forEach((value: any, index: any) => {
      if (value.filename) {
        const existingFileIndex = loadfileCSVCopy.findIndex(
          (file) => file.name === value.filename
        );
        if (existingFileIndex !== -1) {
          // File with same name already exists
          const existingData = loadfileCSVCopy[existingFileIndex].data;

          if (!loadfileCSVCopy[index]?.data[0]?.sentiment) {
            loadfileCSVCopy[existingFileIndex].data.push(value);
          }
        } else {
          // File with new name
          loadfileCSVCopy.push({
            name: value.filename,
            data: [value],
          });
        }
      }
    });

    // Remove the first index if it has null data
    if (
      loadfileCSVCopy[0]?.data?.length === 1 &&
      loadfileCSVCopy[0]?.data[0]?.Text === ""
    ) {
      loadfileCSVCopy.shift();
    }

    setloadfileCSV(loadfileCSVCopy);
  }, [datafilecsv]);

  React.useEffect(() => {
    if (session) {
      calculateProps(loadfileCSV[selectCSV - 1]);
    }
  }, [loadfileCSV]);

  const sendAPI = async () => {
    if (!userId) {
      message.error("Please sing in for analysis!");
      return;
    }
    await fileCSV[selectCSV].data.forEach((item: any) => {
      if (item.Text) {
        textArray.push({ Text: item.Text });
      }
    });
    try {
      message.loading("Analyzing...", 10000);
      const res = await fetch(`${BACKEND_URL}/predictObject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: textArray }),
      });
      const result = await res.json();
      message.destroy();
      message.success("Analyzer success!");
      setdataAPI(result);
    } catch (error) {
      message.destroy();
      message.error("Analyzer error!");
      console.error(error);
    }
  };

  const props: UploadProps = {
    name: "file",
    maxCount: 1,
    accept: ".txt, .csv",
    showUploadList: false,
    beforeUpload: (file) => {
      setfilename(file.name);
      handleFileUpload(file);
      return true;
    },
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status === "done") {
        if (!userId) {
          message.error("Please sing in for upload csv!");
          return;
        } else {
          sendAPI();
          message.success(`${info.file.name}  uploaded successfully!`);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name}  upload failed.`);
      }
    },
  };

  const savefileDB = async () => {
    if (!userId) {
      message.error("Please sing in for save file!");
      return;
    }
    try {
      message.loading("Save file...", 10000);
      const res = await fetch("/api/objectcsv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: dataAPI.data,
          userId: userId,
          filename: filename,
        }),
      });
      message.destroy();
      message.success("Save file success!");
    } catch (error) {
      message.destroy();
      message.error("Save file error!");
      console.error(error);
    }
    GetfilebyId();
    setdone(false);
  };

  React.useEffect(() => {
    if (session) {
      setdone(false);
      calculate();
      calculateProps(loadfileCSV[selectCSV - 1]);
      if (done) {
        savefileDB();
      }
    }
  }, [dataAPI && dataAPI.data]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  async function DelAllCSV() {
    if (!userId) {
      return;
    }
    message.loading("Clearing files...", 10000);
    try {
      await fetch(`/api/objectcsv?userId=${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      await GetfilebyId();
      message.destroy();
      message.success("Clearing file success!");
    } catch (error) {
      console.error(error);
      message.destroy();
      message.error("Clear file error!");
      console.error(error);
    }
  }

  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure clear all file CSV?",
      icon: <QuestionCircleTwoTone twoToneColor="#FF4D4F" />,
      content: "Your files will be completely deleted and cannot be recovered.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        DelAllCSV();
        setloadfileCSV([]);
        setfileCSV([{ name: "", data: [{ Text: "" }] }]);
      },
      onCancel() {},
    });
  };

  const onClick: MenuProps["onClick"] = (e) => {
    if (!userId) {
      return;
    }
    if (e.key === "-1") {
      showDeleteConfirm();
    } else {
      setselectCSV(e.key as unknown as number);
      calculateProps(loadfileCSV[(e.key as unknown as number) - 1]);
    }
  };

  const calculate: any = () => {
    let total: any;
    let positiveCount = 0;
    let neutralCount = 0;
    let negativeCount = 0;
    if (dataAPI && dataAPI.data) {
      total = dataAPI.data.length;
      dataAPI.data.forEach((item: any, index: any) => {
        if (item.Sentiment === "positive") {
          positiveCount++;
        } else if (item.Sentiment === "neutral") {
          neutralCount++;
        } else if (item.Sentiment === "negative") {
          negativeCount++;
        }
      });
      setpositivePercentage(((positiveCount / total) * 100).toFixed(0));
      setneutralPercentage(((neutralCount / total) * 100).toFixed(0));
      setnegativePercentage(((negativeCount / total) * 100).toFixed(0));
    } else {
      setpositivePercentage(0);
      setneutralPercentage(0);
      setnegativePercentage(0);
    }
    setdone(true);
  };

  const calculateProps: any = (props: any) => {
    let total: any;
    let positiveCount = 0;
    let neutralCount = 0;
    let negativeCount = 0;
    if (props) {
      total = props?.data?.length;
      props?.data?.forEach((item: any, index: any) => {
        if (item.sentiment === "positive") {
          positiveCount++;
        } else if (item.sentiment === "neutral") {
          neutralCount++;
        } else if (item.sentiment === "negative") {
          negativeCount++;
        }
      });
      setpositivePercentage(((positiveCount / total) * 100).toFixed(0));
      setneutralPercentage(((neutralCount / total) * 100).toFixed(0));
      setnegativePercentage(((negativeCount / total) * 100).toFixed(0));
    } else {
      setpositivePercentage(0);
      setneutralPercentage(0);
      setnegativePercentage(0);
    }
    setdone(true);
  };

  const renderSentiment = (value: string) => {
    let color = "";
    let sentiment = "";
    if (value === "positive") {
      sentiment = "Positive";
      color = `text-green-600`;
    } else if (value === "negative") {
      sentiment = "Negative";
      color = `text-red-400`;
    } else if (value === "neutral") {
      sentiment = `Neutral`;
      color = `text-blue-400`;
    }

    return <p className={`font-semibold ${color}`}>{sentiment}</p>;
  };

  const renderPercent = (value: string, index: any) => {
    return (
      <Tag
        color={
          !index.sentiment
            ? "blue"
            : index.sentiment === "neutral"
            ? "blue"
            : index.sentiment === "negative"
            ? "red"
            : "green"
        }
      >
        {value ? value : 50}%
      </Tag>
    );
  };

  return (
    <>
      <Layout style={{ backgroundColor: "#F0F2F5" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          theme="light"
          style={{
            height: "100vh",
            left: 0,
            top: 0,
            position: "sticky",
            bottom: 0,
            background: colorBgContainer,
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            style={{
              height: "100vh",
              left: 0,
              top: 0,
              bottom: 0,
              borderRight: 0,
            }}
            items={items}
            defaultOpenKeys={["sub1"]}
            selectedKeys={[selectCSV.toString()]}
            onClick={onClick}
          />
        </Sider>
        <Layout style={{ backgroundColor: "#F0F2F5" }}>
          <Upload {...props} className="mr-4 flex justify-end">
            <button
              className="flex sm:inline-flex justify-center items-center 
                bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring 
                ring-blue-300 text-white text-center rounded-md outline-none 
                transition duration-200 px-5 py-2 mt-5"
            >
              Upload .CSV
            </button>
          </Upload>

          <Content
            style={{
              margin: "24px 16px 0",
              background: colorBgContainer,
              borderRadius: "7px",
              overflow: "initial",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              {!dataAPI.data && !loadfileCSV ? (
                <Table
                  columns={[
                    {
                      title: "No",
                      dataIndex: "key",
                      key: "key",
                      width: "20%",
                    },
                    {
                      title: "Text",
                      dataIndex: "Text",
                      key: "Text",
                      width: "80%",
                    },
                  ]}
                  dataSource={
                    fileCSV[selectCSV].data.length <= 1
                      ? []
                      : fileCSV[selectCSV].data
                  }
                  pagination={{
                    defaultCurrent: 1,
                    pageSizeOptions: [10, 50, 100],
                  }}
                  scroll={{ y: 540 }}
                />
              ) : (
                <>
                  <div>
                    <Row justify={"space-between"}>
                      <p className={"font-semibold text-green-600"}>Positive</p>
                      <Space size={[0, 8]} wrap>
                        <Tag color={"green"}>{positivePercentage}%</Tag>
                      </Space>
                      <Progress
                        percent={positivePercentage}
                        status="success"
                        showInfo={false}
                      />
                    </Row>
                  </div>
                  <div>
                    <Row justify={"space-between"}>
                      <p className={"font-semibold text-blue-400"}>Neutral</p>
                      <Space size={[0, 8]} wrap>
                        <Tag color={"blue"}>{neutralPercentage}%</Tag>
                      </Space>
                      <Progress
                        percent={neutralPercentage}
                        status="normal"
                        showInfo={false}
                      />
                    </Row>
                  </div>
                  <div>
                    <Row justify={"space-between"}>
                      <p className={"font-semibold text-red-400"}>Negative</p>
                      <Space size={[0, 8]} wrap>
                        <Tag color={"red"}>{negativePercentage}%</Tag>
                      </Space>
                      <Progress
                        percent={negativePercentage}
                        status="exception"
                        showInfo={false}
                      />
                    </Row>
                  </div>
                  <Table
                    columns={[
                      {
                        title: "Text",
                        dataIndex: "text",
                        key: "text",
                        width: "50%",
                      },
                      {
                        title: "Sentiment",
                        dataIndex: "sentiment",
                        key: "sentiment",
                        width: "25%",
                        render: renderSentiment, // Apply custom render function
                      },
                      {
                        title: "Percentage",
                        dataIndex: "percentage",
                        key: "percentage",
                        width: "25%",
                        render: renderPercent,
                      },
                    ]}
                    dataSource={
                      loadfileCSV.length > 0
                        ? loadfileCSV[selectCSV - 1]?.data
                        : loadfileCSV[selectCSV - 1]?.data
                        ? loadfileCSV[selectCSV - 1]?.data
                        : []
                    }
                    pagination={{
                      defaultCurrent: 1,
                      pageSizeOptions: [10, 50, 100],
                    }}
                    scroll={{ y: 540 }}
                  />
                </>
              )}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default ImportCSV;
