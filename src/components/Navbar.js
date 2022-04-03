import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Drawers from "./Drawers";
import useAuth from "../hooks/useAuth";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useDispatch } from "react-redux";
import { logout } from "../redux/user/userApi";
import { useNavigate } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import "./Navbar.css";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar className="flex">
        <div className="flex-1">
          <Drawers />
        </div>
        <Typography
          className="flex-1"
          style={{
            textAlign: "center",
            color: "#000",
            fontSize: "1.5em",
            fontWeight: "700",
          }}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Cavalier
        </Typography>
        {}
        {!auth.isLoggedIn ? (
          <div className="flex-1 flex justify-end">
            <Button
              className="cavalier-btn-default"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-end">
            {auth.isAdmin && (
              <div className="flex items-center gap-x-2">
                <Badge
                  badgeContent={4}
                  color="error"
                  onClick={() => navigate("/messages")}
                  className="hover:cursor-pointer"
                >
                  <MailIcon color="action" />
                </Badge>
                <Button
                  className="cavalier-btn-default font-bold"
                  onClick={() => navigate("/panel")}
                >
                  <AssessmentIcon />
                </Button>
              </div>
            )}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className="profile-wrapper text-base"
            >
              <p> {auth.name}</p>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
