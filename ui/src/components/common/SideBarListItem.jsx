import React from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const SideBarListItem = ({ key, text, icon, link }) => {
  const navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  return (
    <ListItem key={key} disablePadding onClick={() => routeChange(link)}>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarListItem;
