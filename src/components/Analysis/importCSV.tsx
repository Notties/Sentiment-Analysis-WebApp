import React from "react";
import { FileExcelOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme } from "antd";
import type { NextPage } from "next";

const { Header, Content, Footer, Sider } = Layout;

const items2: MenuProps["items"] = [FileExcelOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `Storage .CSV`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `file name: ${subKey}`,
      };
    }),
    

  };
  
});

const ImportCSV: NextPage = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout>
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
            height: "100vh",
            left: 0,
            top: 0,
            bottom: 0,
            background: colorBgContainer
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0,}} />
          <Content style={{ margin: "24px 16px 0", background: colorBgContainer }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              content
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