import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import TranslateIcon from "@mui/icons-material/Translate";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import ChairIcon from "@mui/icons-material/Chair";
import HomeIcon from "@mui/icons-material/Home";
import Helper from "../utils/Helper";

const Drawers = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="h-full"
    >
      <List className="flex flex-col h-full justify-between">
        <div>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Anasayfa" />
          </ListItem>
          <ListItem button onClick={() => navigate("/products")}>
            <ListItemIcon>
              <ChairIcon />
            </ListItemIcon>
            <ListItemText primary="Ürünler" />
          </ListItem>
        </div>
        <div>
          <ListItem button onClick={() => Helper.setDefaultLanguage("tr")}>
            <ListItemIcon>
              <TranslateIcon />
            </ListItemIcon>
            <ListItemText primary="Turkish" />
          </ListItem>

          <ListItem button onClick={() => Helper.setDefaultLanguage("en")}>
            <ListItemIcon>
              <TranslateIcon />
            </ListItemIcon>
            <ListItemText primary="English" />
          </ListItem>

          <ListItem button onClick={() => Helper.setDefaultLanguage("ru")}>
            <ListItemIcon>
              <TranslateIcon />
            </ListItemIcon>
            <ListItemText primary="Russian" />
          </ListItem>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default Drawers;
