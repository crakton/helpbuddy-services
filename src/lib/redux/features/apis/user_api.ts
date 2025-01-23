import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import Cookies from "js-cookie";
import { IUser } from "@/interfaces";
import { prepareHeaders } from "@/utils/prepare_header";
import { IUserResponse, IUsersResponse } from "@/interfaces/user.interface";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders
  }),
  endpoints: (build) => ({
    getUser: build.query<IUserResponse, string>({
      query: (id:string) => `/users/${id}`,
    }),
    getUsers: build.query<IUsersResponse, void>({
      query: () => `/users`,
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

export const { useGetUserQuery,useGetUsersQuery } = userApi;
