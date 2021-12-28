import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  listParams,
  ListResponse,
  PaginationParams,
  Student,
} from "../../models";

export interface StudentState {
  loading: boolean;
  list: Student[];
  filter: listParams;
  pagination: PaginationParams;
}

const initialState: StudentState = {
  loading: false,
  list: [],
  filter: { _page: 1, _limit: 15 },
  pagination: { _page: 1, _limit: 15, _totalRows: 15 },
};
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<listParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(
      state,
      action: PayloadAction<ListResponse<Student>>
    ) {
      state.loading = false;
      state.pagination = action.payload.pagination;
      state.list = action.payload.data;
    },
    fetchStudentFailedList(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<listParams>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<listParams>) {},

    removeStudent(state, action: PayloadAction<Student>) {
      state.loading = true;
    },
    removeStudentSuccess(state) {
      state.loading = false;
    },
  },
});

export const studentActions = studentSlice.actions;

const studentReducer = studentSlice.reducer;
export default studentReducer;
