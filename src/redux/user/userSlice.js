import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./userApi";

const initialState = {
  name: "",
  surname: "",
  error: "",
  isLoggedIn: false,
  isAdmin: "",
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
        state.isAdmin = action.payload.data.isAdmin;
        state.isLoggedIn = true;
        state.token = action.payload.data._id;
      } else {
        return initialState;
      }
    });

    builder.addCase(login.rejected, (state, action) => {
      state.error = "An error ocurred";
    });

    builder.addCase(logout, () => {
      return initialState;
    });
  },
});

export default loginSlice.reducer;
