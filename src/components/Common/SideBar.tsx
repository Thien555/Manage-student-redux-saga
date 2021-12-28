import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import { NavLink } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    linkBtn: {
      textDecoration: "none",
      color: "inherit",
    },
  })
);

export default function SideBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <NavLink
          to="/admin/dashboard"
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
          className={classes.linkBtn}
        >
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>

        <NavLink
          to="/admin/students"
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
          className={classes.linkBtn}
        >
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Students" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
}
