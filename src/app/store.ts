import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import authReducer from "../features/auth/authSlice";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { history } from "../utils/history";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import studentReducer from "../features/student/studentSlice";
import cityReducer from "../features/city/citySlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer,
  router: connectRouter(history),
});
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)), //sài default middleware of redux-toolkit and add one middleware is sagaMiddleware
});

sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
