import React from "react";
import {
  CloudUploadOutlined,
  FacebookOutlined,
  FileExcelOutlined,
  ImportOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, Tabs, theme } from "antd";
import ImportCSV from "@/src/components/Analysis/importCSV";
import type { NextPage } from "next";
const { Header, Content, Footer, Sider } = Layout;
import { Typography } from "antd";

const { Text } = Typography;

const analysis: NextPage = () => {
  return (
    <>
      <Tabs
        items={[
          {
            key: "1",
            label: (
              <div className="px-7">
                <CloudUploadOutlined style={{ fontSize: 19, verticalAlign: "baseline" }} />
                Import .CSV
              </div>
            ),
            children: <ImportCSV />,
          },
          {
            key: "2",
            label: (
              <div className="px-7">
                <FacebookOutlined style={{ fontSize: 18, verticalAlign: "baseline" }} />
                Face book
              </div>
            ),
            children: "Content of Tab Pane 2",
          },
        ]}
      />
    </>
  );
};

export default analysis;
