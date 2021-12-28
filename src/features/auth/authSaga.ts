import { fork, take, call, delay, put } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { LoginPayload, loginRequest, loginSuccess, logout } from "./authSlice";

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    yield delay(500);
    localStorage.setItem("access_token", "loginToken");
    yield put(
      loginSuccess({
        name: "good",
        id: 1,
      })
    );
    yield put(push("/admin"));
  } catch (error) {}
}
function* handleLogout() {
  yield delay(500);
  localStorage.removeItem("access_token");
  yield put(push("/login"));
}
function* watchLoginFlow() {
  while (true) {
    const isLogin = Boolean(localStorage.getItem("access_token"));
    if (!isLogin) {
      const action: PayloadAction<LoginPayload> = yield take(loginRequest.type);
      yield fork(handleLogin, action);
    }

    yield take(logout.type);
    yield call(handleLogout);
  }
}
export default function* authSaga() {
  yield fork(watchLoginFlow);
}
