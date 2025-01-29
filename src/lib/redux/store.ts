"use client";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./features/slices";


export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const store = setupStore();
export const persistor = persistStore(store);
