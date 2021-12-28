import {
  Box,
  Grid,
  LinearProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { PermPhoneMsg } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import StatisticItem from "../components/StatisticItem";
import StudentRakingList from "../components/StudentRakingList";
import Widget from "../components/Widget";
import { dashboardActions } from "../dashboardSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  },
}));

interface Props {}

export const DashBoard = (props: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const statistics = useAppSelector((state) => state.dashboard.statistics);
  const highestStudentList = useAppSelector(
    (state) => state.dashboard.highestStudentList
  );
  const lowestStudentList = useAppSelector(
    (state) => state.dashboard.lowestStudentList
  );
  const rankingByCityList = useAppSelector(
    (state) => state.dashboard.rankingByCityList
  );
  const loading = useAppSelector((state) => state.dashboard.loading);
  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PermPhoneMsg color="primary" fontSize="large" />}
            lable="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PermPhoneMsg color="primary" fontSize="large" />}
            lable="female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PermPhoneMsg color="primary" fontSize="large" />}
            lable="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<PermPhoneMsg color="primary" fontSize="large" />}
            lable="mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      {/* All studentranking */}
      <Box mt={4}>
        <Typography variant="h5">All students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Widget title="Student with highest mark">
                <StudentRakingList
                  studentList={highestStudentList}
                ></StudentRakingList>
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Widget title="Student with lowest mark">
                <StudentRakingList
                  studentList={lowestStudentList}
                ></StudentRakingList>
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Raking by city  */}
      <Box mt={4}>
        <Typography variant="h5">Ranking by city</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={ranking.cityId}>
                  <StudentRakingList
                    studentList={ranking.rankingList}
                  ></StudentRakingList>
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
