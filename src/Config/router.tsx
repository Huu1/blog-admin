import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";

export const MenuList = [
  {
    title: "主页",
    id: "home",
    path: "/",
    icon: <Home />,
  },
  {
    title: "4级页面",
    id: "test1",
    path: "/test1",
    icon: <Public />,
  },
  {
    title: "测试",
    id: "test2",
    path: "/test2",
    icon: <People />,
    children: [
      {
        title: "二级页面",
        id: "tet3",
        path: "/test3",
        icon: <Public />,
      },
    ],
  },
];
