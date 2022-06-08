import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + "/login",
      data
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
});

export const register = async (data) => {
  return await axios
    .post(process.env.REACT_APP_BASE_URL + `/register`, data)
    .then((res) => res.data)
    .catch((e) => e.response);
};

export const logout = createAction("user/logout");
