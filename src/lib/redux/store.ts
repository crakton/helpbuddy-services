"use client";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./features/slices";
import { authApi } from "./features/apis/auth_api";
import { providersApi } from "./features/apis/providers_api";
import { categoryApi } from "./features/apis/categories_api";
import { reviewsApi } from "./features/apis/reviews_api";
import { servicesApi } from "./features/apis/services_api";
import { userApi } from "./features/apis/user_api";
import { bookingsApi } from "./features/apis/bookings_api";

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (gDM) =>
      gDM().concat(
        authApi.middleware,
        bookingsApi.middleware,
        categoryApi.middleware,
        providersApi.middleware,
        reviewsApi.middleware,
        servicesApi.middleware,
        userApi.middleware
      ),
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
