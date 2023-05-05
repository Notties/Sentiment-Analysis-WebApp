import React, { useState } from "react";
import { FileExcelOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Layout, Menu, MenuProps, Row, theme } from "antd";
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

const items2: MenuProps["items"] = [FileExcelOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `Storage .CSV`,

    children: kvArray.map((value: any, index: any) => {
      return {
        key: index,
        label: `file name: ${value.value}`,
      };
    }),
  };
});
const ImportCSV: NextPage = () => {
  const [csvData, setCsvData] = useState<any>(null);

  const handleFileUpload = (file: any) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const fileContents = event.target.result;
      const parsedData: any = Papa.parse(fileContents, {
        encoding: "utf-8",
        delimiter: ",",
      } as any);
      setCsvData(Object.assign({}, parsedData.data));
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

  console.log("csvData: ", csvData);

  return (
    <>
      <Layout style={{ backgroundColor: "#F0F2F5" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          theme="light"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{
            overflow: "auto",
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
              {csvData
                ? Object.values(csvData).map((value: any, key: any) => {
                    return (
                      <>
                        <p key={key}>
                          {value[0]} | {value[1]}
                        </p>
                      </>
                    );
                  })
                : ""}
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
