import {
  Box,
  Button,
  Theme,
  Typography,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import studentApi from "../../../api/studentApi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { City, listParams, Student } from "../../../models";
import { studentActions } from "../studentSlice";
import StudentFilter from "./StudentFilter/StudentFilter";
import StudentTable from "./StudentTable/Studenttable";

interface Props {
  listCityMap: { [key: string]: City };
  listCity: City[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(1),
  },
  title: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  loading: {
    position: "absolute",
    top: theme.spacing(-1),
    width: "100%",
  },
}));

const ListPage = ({ listCityMap, listCity }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const listStudent = useAppSelector((state) => state.student.list);
  const loading = useAppSelector((state) => state.student.loading);
  const studentPagination = useAppSelector((state) => state.student.pagination);
  const studentFilter = useAppSelector((state) => state.student.filter);
  const [isDelete, setDelete] = useState(false);
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(studentFilter));
  }, [dispatch, studentFilter]);

  function hanldeEditStudent(student: Student) {
    history.push(`${match.url}/${student.id}`);
  }

  function handleClickAddStudent() {
    history.push(`${match.url}/add`);
  }

  async function handleRemoveStudent(student: Student) {
    await studentApi.remove(student.id);
    // await dispatch(studentActions.removeStudent(student));
    // setTimeout(() => setDelete(true), 1000)
    dispatch(studentActions.fetchStudentList({ ...studentFilter }));
  }
  function handlePageChange(e: any, page: number) {
    dispatch(
      studentActions.setFilter({
        ...studentFilter,
        _page: page,
      })
    );
  }

  const onSearchChange = (newFilter: listParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const onChange = (newFilter: listParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.title}>
        <Typography variant="h4">Students</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickAddStudent}
        >
          Add new student
        </Button>
      </Box>
      <Box mb={3}>
        <StudentFilter
          filter={studentFilter}
          cityList={listCity}
          onSearchChange={onSearchChange}
          onChange={onChange}
        />
      </Box>
      <StudentTable
        listCityMap={listCityMap}
        studentList={listStudent}
        onEdit={hanldeEditStudent}
        onRemove={handleRemoveStudent}
      />

      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(
            studentPagination._totalRows / studentPagination._limit
          )}
          page={studentPagination._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default ListPage;
