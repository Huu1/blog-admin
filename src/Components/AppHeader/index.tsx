import * as React from "react";
import { AuthContext } from "@/Layout/Auth";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

export default function AppHeader(props: any) {
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);

  const handleMenuClose = () => {
    auth.signout(() => {
      navigate("/login");
    });
  };

  return (
    <Layout.Header style={{ padding: 0 }} className='bg-white'>
      {React.createElement(
        props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "menu-trigger",
          onClick: () => props.setCollapsed((old: boolean) => !old),
        }
      )}
    </Layout.Header>
  );
}
