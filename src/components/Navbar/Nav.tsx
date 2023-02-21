import { DashboardOutlined, FileOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { useState } from "react";

const Nav = () => {
  const [current, setCurrent] = useState("/");

  const items: MenuProps["items"] = [
    {
      label: <Link href="/">Sentiment Analyzer</Link>,
      key: "/",
      icon: <DashboardOutlined />
    },
    {
      label: <Link href="/apidocs">API Docs</Link>,
      key: "apidocs",
      icon: <FileOutlined />
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
};

export default Nav;
