import { Box, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import Header from "../Common/Header";
import SideBar from "../Common/SideBar";
import { Route, Switch } from "react-router-dom";
import { DashBoard } from "../../features/dashboard/page/DashBoard";
import { Student } from "../../features/student/page/Student";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "grid",
    minHeight: "100vh",
    gridTemplateAreas: '"header header" "sidebar main"',
    gridTemplateRows: "auto 1fr",
    gridAutoColumns: "250px 1fr",
  },
  header: {
    gridArea: "header",
  },
  sidebar: {
    gridArea: "sidebar",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  main: {
    gridArea: "main",
    padding: theme.spacing(2, 3),
  },
}));

const AdminLayout = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <SideBar />
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <DashBoard />
          </Route>
          <Route path="/admin/students">
            <Student />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
};

export default AdminLayout;
