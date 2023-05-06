import React, { useState } from "react";
import { FileExcelOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Layout, List, Menu, MenuProps, Row, Table, theme } from "antd";
import type { NextPage } from "next";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import Papa from "papaparse";

const { Header, Content, Footer, Sider } = Layout;

const kvArray = [
  { index: 1, value: 10 },
  { index: 2, value: 20 },
  { index: 3, value: 30 },
];

const ImportCSV: NextPage = () => {
  const [fileCSV, setfileCSV] = useState<any>([{ name: "", data: "" }]);
  const [selectCSV, setselectCSV] = useState<number>(0);
  
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
        .map((innerArray: any) => ({
          No: innerArray[0],
          Sentiment: innerArray[1],
        }));
      setfileCSV([...fileCSV, { name: `${file.name}`, data: adaptedData }]);
      setselectCSV(fileCSV.length);
    };
    reader.readAsText(file, "UTF-8");
  };

  const props: UploadProps = {
    name: "file",
    maxCount: 1,
    accept: ".txt, .csv",
    showUploadList: false,
    beforeUpload: (file) => {
      handleFileUpload(file);
      return false;
    },
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        message.success(`${info.file.name}  uploaded successfully`);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name}  uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name}  upload failed.`);
      }
    },
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setselectCSV(e.key as unknown as number);
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
              <Table
                columns={[
                  {
                    title: "No",
                    dataIndex: "No",
                    key: "No",
                    width: "1%",
                  },
                  {
                    title: "Sentiment",
                    dataIndex: "Sentiment",
                    key: "Sentiment",
                    width: "12%",
                  },
                ]}
                dataSource={fileCSV ? fileCSV[selectCSV].data : ""}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 540 }}
              />
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
