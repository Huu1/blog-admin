import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemIcon from "@mui/material/ListItemIcon";
import Home from "@mui/icons-material/Home";

const renderMenu = (data: any) => {
  return data.map((item: any) => {
    if (item.children) {
      //如果有子节点，继续递归调用，直到没有子节点
      return (
        <SubMenu title={item.title} key={item.key}>
          {renderMenu(item.children)}
        </SubMenu>
      );
    }
    //没有子节点就返回当前的父节点
    return (
      <MenuItem title={item.title} key={item.key}>
        {item.title}
      </MenuItem>
    );
  });
};

const MenuItem = ({ title, icon }: any) => {
  const handleClick = () => {};
  return (
    <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

const ListItem = (props: any) => {
  return <div className="">{props.children}</div>;
};

const SubMenu = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItem>{props.children}</ListItem>
      </Collapse>
    </>
  );
};

export default function Index({ data, className, style }: any) {
  return (
    <List className={`${className}`} style={style}>
      {renderMenu(data)}
    </List>
  );
}
