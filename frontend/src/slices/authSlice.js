import { createSlice } from "@reduxjs/toolkit";
import { safeParseLocalStorage } from "../utils/safeLocalStorage";

const initialState = {
  signupData: null,
  loading: false,
  // BUGFIX: raw JSON.parse(localStorage.getItem("token")) here crashed the
  // entire app at boot ("Uncaught SyntaxError: Unexpected non-whitespace
  // character after JSON...") whenever localStorage held a non-JSON value
  // under "token". See utils/safeLocalStorage.js for the full explanation.
  token: safeParseLocalStorage("token", null),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;