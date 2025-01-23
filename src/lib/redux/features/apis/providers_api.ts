import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { prepareHeaders } from "@/utils/prepare_header";
import { IUser } from "@/interfaces";
export const providersApi = createApi({
  reducerPath: "providersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  prepareHeaders,
  }),
  endpoints: (build) => ({
    getProviders: build.query<IUser[], void>({
      query: () => "/users?limit=100",
      transformResponse(response: {data: IUser[]}) {
          const provider =  response.data.filter(user => user.role === "provider");
          //get the services offered by the provider.
          return provider;
      },
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

export const { useGetProvidersQuery } = providersApi;
