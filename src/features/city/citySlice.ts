import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City, ListResponse } from "../../models";

interface cityState {
  loading: boolean;
  list: City[];
}

const initialState: cityState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    getCityListRequest(state) {
      state.loading = true;
    },
    getCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = true;
      state.list = action.payload.data;
    },
    getCityListFailed(state) {
      state.loading = false;
    },
  },
});

export const cityActions = citySlice.actions;

const cityReducer = citySlice.reducer;
export default cityReducer;
