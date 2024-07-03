import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Popover,
  Typography,
  withStyles,
  Button,
} from "@material-ui/core";
import {
  Person as AccountIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { UserContext } from "../context/UserContext";

const Header = ({ classes, isSidebarOpened, toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { handleLogout } = useContext(UserContext);
  const user = {
    name: localStorage.getItem("name"),
    role: localStorage.getItem("role"),
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.logotype}>
          MERN ASSIGNMENT
        </Typography>
        <div className={classes.grow} />
        <IconButton
          color="inherit"
          className={classes.headerMenuButton}
          onClick={handleProfileClick}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleProfileClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div className={classes.popoverContent}>
            <Typography variant="subtitle1" className={classes.popoverText}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.role}
            </Typography>
          </div>
        </Popover>
        <IconButton color="inherit" className={classes.headerMenuButton}>
          {localStorage.getItem("name") ? (
            <Typography onClick={handleLogout}>Logout</Typography>
          ) : (
            <Typography onClick={handleLogout}>Sign In</Typography>
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logotype: {
    flexGrow: 1,
    fontWeight: 500,
    fontSize: 24,
    whiteSpace: "nowrap",
  },
  grow: {
    flexGrow: 1,
  },
  headerMenuButton: {
    marginRight: theme.spacing(2),
  },
  headerIcon: {
    fontSize: 28,
  },
  popoverContent: {
    padding: theme.spacing(2),
  },
  popoverText: {
    fontWeight: 500,
    marginBottom: theme.spacing(1),
  },
  logoutButton: {
    marginTop: theme.spacing(2),
  },
});

export default withStyles(styles)(Header);
