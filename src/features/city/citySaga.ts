import { call, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import cityApi from "../../api/cityApi";
import { City, listParams, ListResponse } from "../../models";
import { cityActions } from "./citySlice";

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);

    yield put(cityActions.getCityListSuccess(response));
  } catch (error) {
    yield put(cityActions.getCityListFailed());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.getCityListRequest, fetchCityList);
}
