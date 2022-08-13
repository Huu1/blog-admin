import * as React from "react";
import { MenuList } from "@/Config/router";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

export default function Index(props: any) {
  const navigate = useNavigate();
  return (
    <>
      <Layout.Sider trigger={null} collapsible collapsed={props.collapsed}>
        <div className="app-logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          onSelect={({ key }) => {
            navigate(key);
          }}
          items={MenuList}
        />
      </Layout.Sider>
    </>
  );
}
