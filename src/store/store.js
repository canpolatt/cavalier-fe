import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userSlice from "../redux/user/userSlice";
import loadingSlice from "../redux/loading/loadingSlice"
import { persistCombineReducers } from "redux-persist";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistCombineReducers(persistConfig, { userSlice });

export const store = configureStore({
  reducer: {
    persist: persistedReducer,
    user: userSlice,
    loading: loadingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
