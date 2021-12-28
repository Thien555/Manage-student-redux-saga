import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export interface LoginPayload {
  username: string;
  password: string;
}

interface AuthState {
  isLoggedIn: boolean;
  loading?: boolean;
  currentUser?: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  currentUser: undefined,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction) {
      state.loading = false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

const { reducer, actions } = authSlice;
export const { loginRequest, loginSuccess, loginFailed, logout } = actions;
const authReducer = reducer;
export default authReducer;
