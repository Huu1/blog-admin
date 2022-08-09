import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemIcon from "@mui/material/ListItemIcon";
import { menuTreeHandle, getTreeItem, getTreeIds } from "@/utils";
import { useLocation, useNavigate } from "react-router-dom";

interface MenuContextType {
  activeId: number | string;
  setActiveId: (id: number | string) => void;
  defaultExpend: number[] | string[];
}

const MenuContext = React.createContext<MenuContextType>(null!);

const renderMenu = (data: any) => {
  return data.map((item: any) => {
    if (item.children) {
      return (
        <SubMenu {...item} key={item.id}>
          {renderMenu(item.children)}
        </SubMenu>
      );
    }
    return <MenuItem {...item} key={item.id} />;
  });
};

const MenuItem = ({ title, icon, level, id, path }: any) => {
  const navigator = useNavigate();
  const { activeId } = React.useContext(MenuContext);
  const handleClick = () => {
    navigator(path);
  };
  return (
    <ListItemButton
      style={{ background: activeId === id ? "red" : "" }}
      onClick={() => handleClick()}
      sx={{ pl: level + 1 }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

const SubMenu = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const { defaultExpend } = React.useContext(MenuContext);

  const handleClick = () => {
    setOpen(!open);
  };

  React.useLayoutEffect(() => {
    if (defaultExpend.includes(props.id as never)) {
      setOpen(true);
    }
  }, [defaultExpend, props.id]);

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: props.level + 1 }}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.children}
        </List>
      </Collapse>
    </>
  );
};

export default function Index({ data, className, style }: any) {
  const _data = React.useMemo(() => menuTreeHandle(data), [data]);
  const [activeId, setActiveId] = React.useState<number | string>("");
  const [defaultExpend, setDefaultExpend] = React.useState<number[] | string[]>(
    []
  );
  const value = { activeId, setActiveId, defaultExpend };
  const location = useLocation();

  React.useLayoutEffect(() => {
    if (_data.length > 0) {
      let item = getTreeItem(_data, "path", location.pathname);
      item?.id && setActiveId(item.id);
      item?.id && setDefaultExpend(getTreeIds(_data, item.id));
    }
  }, [location, _data]);

  return (
    <MenuContext.Provider value={value}>
      <List className={`${className}`} style={style}>
        {renderMenu(_data)}
      </List>
    </MenuContext.Provider>
  );
}
