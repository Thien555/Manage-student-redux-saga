import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { loginRequest } from "../authSlice";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  boxPaper: {
    padding: theme.spacing(3),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.loading);
  const handleLoginClick = () => {
    dispatch(
      loginRequest({
        username: "",
        password: "",
      })
    );
  };
  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.boxPaper}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
          >
            {isLoading && <CircularProgress size={20} color="secondary" />}
            &nbsp; Fake login
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;
