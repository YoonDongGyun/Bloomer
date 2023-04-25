import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

function LocalListItem({ location, setKeyword }: any): JSX.Element {
  const onClickLocation = () => {
    setKeyword({ word: location.place_name, new: false });
  };

  return (
    <ListItem disablePadding>
      <ListItemButton role={undefined} onClick={onClickLocation} dense>
        <ListItemText primary={location.place_name} />
      </ListItemButton>
    </ListItem>
  );
}

export default LocalListItem;
