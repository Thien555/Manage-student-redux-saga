import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "../../models";

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number; //diem >8
  lowMarkCount: number; //diem < 5
}

export interface RankingByCity {
  cityId: string;
  rankingList: Student[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0, //diem >8
    lowMarkCount: 0, //diem < 5
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },

    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});
export const dashboardActions = dashboardSlice.actions;
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
