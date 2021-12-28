import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

interface Props {
  icon: React.ReactElement;
  lable: string;
  value: string | number;
}

const StatisticItem = ({ icon, lable, value }: Props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>

        <Typography variant="caption">{lable}</Typography>
      </Box>
    </Paper>
  );
};

export default StatisticItem;
