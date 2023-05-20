import React, { useState } from "react";
import { FileExcelOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  MenuProps,
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

const { Content, Footer, Sider } = Layout;

const ImportCSV: NextPage = () => {
  const [fileCSV, setfileCSV] = useState<any>([
    { name: "", data: [{ Text: "" }] },
  ]);
  const [dataAPI, setdataAPI] = useState<any>([]);
  const textArray: { Text: string }[] = [];
  const [selectCSV, setselectCSV] = useState<number>(0);
  const [positivePercentage, setpositivePercentage] = useState<any>(0);
  const [neutralPercentage, setneutralPercentage] = useState<any>(0);
  const [negativePercentage, setnegativePercentage] = useState<any>(0);

  const items2: MenuProps["items"] = [FileExcelOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `Storage .CSV`,

      children: Object.values(fileCSV).map((value: any, index: any) => {
        if (value.name === "") {
          return;
        }
        return {
          key: index,
          label: `${value.name}`,
        };
      }),
    };
  });

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

  const sendAPI = async () => {
    await fileCSV[selectCSV].data.forEach((item: any) => {
      if (item.Text) {
        textArray.push({ Text: item.Text });
      }
    });
    try {
      message.loading("Analyzing...", 10000);
      const res = await fetch("https://207a-2403-6200-88a2-e015-6d9c-5547-3578-4d12.ngrok-free.app/predictObject/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: textArray }),
      });
      const result = await res.json();
      console.log("result", result);
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
      console.log("file", file);
      handleFileUpload(file);
      return true;
    },
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status === "done") {
        sendAPI();
        message.success(`${info.file.name}  uploaded successfully!`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name}  upload failed.`);
      }
    },
  };
  
  React.useEffect(() => {
    calculate()
  }, [dataAPI && dataAPI.data])
  

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setselectCSV(e.key as unknown as number);
  };

  console.log("dataAPI.data", dataAPI.data);

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
            items={items2}
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
              {!dataAPI.data ? (
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
                        dataIndex: "Text",
                        key: "Text",
                        width: "50%",
                      },
                      {
                        title: "Sentiment",
                        dataIndex: "Sentiment",
                        key: "Sentiment",
                        width: "25%",
                      },
                      {
                        title: "Percentage",
                        dataIndex: "Percentage",
                        key: "Percentage",
                        width: "25%",
                      },
                    ]}
                    dataSource={dataAPI.data}
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
