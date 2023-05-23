import React from "react";
import {
  CloudUploadOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import ImportCSV from "@/src/components/Analysis/importCSV";
import Websites from "@/src/components/Analysis/websites";
import type { NextPage } from "next";

const analysis: NextPage = () => {
  return (
    <>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        items={[
          {
            key: "1",
            label: (
              <div className="px-7">
                <CloudUploadOutlined
                  style={{ fontSize: 19, verticalAlign: "text-top" }}
                />
                Import .CSV
              </div>
            ),
            children: <ImportCSV />,
          },
          {
            key: "2",
            label: (
              <div className="px-7">
                <LineChartOutlined
                  style={{ fontSize: 18, verticalAlign: "text-top"}}
                />
                Websites
              </div>
            ),
            children: <Websites />,
          },
        ]}
      />
    </>
  );
};

export default analysis;
