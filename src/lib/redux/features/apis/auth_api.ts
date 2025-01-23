import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),
    loginUser: build.mutation({
      query: (body: { email: string; password: string }) => ({
        url: "/signin",
        method: "POST",
        body,
      }),
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.payload) {
      // when persisting the root reducer
      if (reducerPath && action.type === REHYDRATE) {
        return action?.payload[reducerPath];
      }
      // when persisting the api reducer
      if (action.type === REHYDRATE && action.key === "root") {
        return action.payload;
      }
    }
  },
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
