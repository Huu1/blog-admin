import React from "react";
import "./index.css";
import { Outlet } from "react-router-dom";
import AppHeader from "@/Components/AppHeader";
import AppSideBar from "@/Components/AppSideBar";
import { Card, Layout } from "antd";

const { Content } = Layout;

const Index = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <>
      <Layout className=" h-screen">
        <AppSideBar collapsed={collapsed} />
        <Layout>
          <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 280,
            }}
          >
            <Card>
              <Outlet />
            </Card>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Index;
