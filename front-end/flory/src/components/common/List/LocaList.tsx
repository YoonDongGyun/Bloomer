import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import LocalListItem from "./LocalListItem";

function LocaList({ func }: any): JSX.Element {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ width: "100%", maxHeight: "200px", bgcolor: "background.paper" }}
    >
      {func.locations.map((location: any, idx: any) => {
        return (
          <LocalListItem
            key={idx}
            location={location}
            setKeyword={func.setKeyword}
          />
        );
      })}
    </List>
  );
}

export default LocaList;
