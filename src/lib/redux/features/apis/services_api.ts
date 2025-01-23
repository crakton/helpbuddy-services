import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { IServiceResponse, IServicesResponse } from "@/interfaces";
import { prepareHeaders } from "@/utils/prepare_header";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders
  }),
  endpoints: (build) => ({
    getServices: build.query<IServicesResponse, void>({
      query: () => "/services",
      
    }),
    getServicesByCount: build.query<IServicesResponse, number>({
      query: (count:number) => `/services?limit=${count}`,
    }),
    getServicesByPage: build.query<IServicesResponse, number>({
      query: (page:number) => `/services?page=${page}`,
    }),
    getServiceById: build.query<IServiceResponse, string>({
      query: (id:string) => `/services/${id}`,
    }),
    getServicesByProviderId: build.query<IServicesResponse, string>({
      query: (id:string) => `/services/${id}/provider`,
    }),
    getServicesByCategoryId: build.query<IServicesResponse, string>({
      query: (id:string) => `services/${id}/category`,
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

export  const {useGetServicesByCountQuery,useGetServicesQuery,useGetServicesByPageQuery,useGetServicesByProviderIdQuery,useGetServiceByIdQuery,useGetServicesByCategoryIdQuery} = servicesApi;
