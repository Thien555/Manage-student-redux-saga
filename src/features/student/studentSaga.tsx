import {
  call,
  debounce,
  put,
  takeLatest,
  takeLeading,
} from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "../../api/studentApi";
import { listParams, ListResponse, Student } from "../../models";
import { studentActions } from "./studentSlice";

function* fetchStudentList(action: PayloadAction<listParams>) {
  try {

    const response: ListResponse<Student> = yield call(
      studentApi.getAll,
      action.payload
    );
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    alert(error);
    yield put(studentActions.fetchStudentFailedList());
  }
}

function* handleSearchDebonuce(action: PayloadAction<listParams>) {
  yield put(studentActions.setFilter(action.payload));
}

function* hanldeRemoveStudent(action: PayloadAction<Student>) {
  try {

    yield call(studentApi.remove, action.payload.id);
    yield put(studentActions.removeStudentSuccess());
  } catch (error) {}
}
export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList, fetchStudentList);

  yield debounce(
    500,
    studentActions.setFilterWithDebounce,
    handleSearchDebonuce
  );

  yield takeLatest(studentActions.removeStudent, hanldeRemoveStudent);
}
