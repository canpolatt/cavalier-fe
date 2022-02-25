import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./userApi";

const initialState = {
  name: "",
  surname: "",
  error: "",
  isLoggedIn: false,
  userType: "",
  token: "",
};

export const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.error = "";
    });

    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.name = action.payload.data.name;
        state.surname = action.payload.data.surname;
        state.userType = action.payload.data.userType;
        state.isLoggedIn = true;
        state.token = action.payload.data.accessToken;
      } else {
        return initialState;
      }
    });

    builder.addCase(login.rejected, (state, action) => {
      state.error = "An error ocurred";
    });

    builder.addCase(logout, () => {
      localStorage.removeItem("accessToken");
      return initialState;
    });
  },
});

export default loginSlice.reducer;
