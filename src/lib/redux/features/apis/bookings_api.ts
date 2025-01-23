import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { IBookingResponse, IBookingsResponse } from "@/interfaces";
import { prepareHeaders } from "@/utils/prepare_header";

export const bookingsApi = createApi({
  reducerPath: "bookingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders,
  }),
  endpoints: (build) => ({
    getBookings: build.query<IBookingsResponse, void>({
      query: () => "/bookings",
    }),
    bookService: build.mutation<
      IBookingResponse,
      { amount: number; location: string; serviceId: string }
    >({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
      }),
    }),
    updateBookedService: build.mutation<
      IBookingResponse,
      { id: string; payload: {} }
    >({
      query: (body) => {
        const { id, ...rest } = body;
        return {
          url: `/bookings/${body.id}`,
          method: "PUT",
          body: rest,
        };
      },
    }),
    dropBookedService: build.mutation<IBookingResponse, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
    }),
    getBookingById: build.query<IBookingsResponse, string>({
      query: (id) => `/bookings/${id}`,
    }),
    getBookingsByCount: build.query<IBookingsResponse, number>({
      query: (count: number) => `/bookings?limit=${count}`,
    }),
    getBookingsByPage: build.query<IBookingsResponse, number>({
      query: (page: number) => `/bookings?page=${page}`,
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.payload) {
      // when persisting the root reducer
      if (reducerPath && action.type === REHYDRATE) {
        return action?.payload[reducerPath];
      }
      // when persisting the api reducer
      if (action.type === REHYDRATE && action.key === "bookings") {
        return action.payload;
      }
    }
  },
});

export const {
  useBookServiceMutation,
  useDropBookedServiceMutation,
  useGetBookingByIdQuery,
  useGetBookingsByCountQuery,
  useGetBookingsByPageQuery,
  useGetBookingsQuery,
  useUpdateBookedServiceMutation,
} = bookingsApi;
