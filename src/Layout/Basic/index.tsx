import React, { useState } from "react";
import "./index.css";
import { Outlet } from "react-router-dom";
import AppHeader from "@/Components/Header";
import Box from "@mui/material/Box";
import SideBar from "@/Components/SideBar";

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <AppHeader />
      <Box className="page-main flex">
        <SideBar />
        <Box className=" overflow-y-auto flex-1 flex flex-col page-content p-6">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Index;
