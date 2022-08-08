import * as React from "react";
import NestedMenu from "./NestedMenu";

import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";

const items = [
  {
    title: "主页",
    key: "home",
    link: "/",
    icon: <Home />,
  },
  {
    title: "测试",
    key: "test",
    link: "/test",
    icon: <People />,
    children: [
      {
        title: "二级页面",
        key: "tet2",
        link: "/test23",
        icon: <Public />,
      },
    ],
  },
];

export default function CustomizedList() {
  return (
    <NestedMenu
      data={items}
      className="bg-white border-r"
      style={{ minWidth: "200px" }}
    />
  );
}
