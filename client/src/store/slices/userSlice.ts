import { AUTH_COOKIES_REMOVE_LIST } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// import type { RootState } from "../store";
export type userDataType = {
  username: string;
  fullName: string;
  email: string;
  bio: string;
  phone: string;
  designation: string;
  location: string;
  gender: string;
  isAdmin: boolean;
  isGuest: boolean;
  guestExpiresAt: string | null;
  skills: string[];
  projects: any[];
  experience: any[];
  education: any[];
  avatar: string | null;
  avatarUrl: string | null;
  _id: string;
  isEmailVerified: boolean;
};
export interface UserState {
  userData: userDataType | null;
  AuthState: boolean;
}
const initialState: UserState = {
  userData: null,
  AuthState: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<userDataType>) => {
      state.AuthState = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      AUTH_COOKIES_REMOVE_LIST.forEach((cookie) => Cookies.remove(cookie));
      state.AuthState = false;
      state.userData = null;
    },
    verifyEmail: (state, action: PayloadAction<boolean>) => {
      if (state.userData) {
        state.userData.isEmailVerified = action.payload;
      }
    },
  },
});
export const { login, logout,verifyEmail } = userSlice.actions;
export default userSlice.reducer;