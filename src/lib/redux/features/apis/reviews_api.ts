import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { IReviewResponse, IReviewsResponse } from "@/interfaces";
import { prepareHeaders } from "@/utils/prepare_header";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders,
  }),
  endpoints: (build) => ({
    getReviews: build.query<IReviewsResponse, void>({
      query: () => "/reviews/all",
    }),
    getMyReviews: build.query<IReviewsResponse, void>({
      query: () => "/reviews",
    }),
    getReviewsByServiceId: build.query<IReviewsResponse, string>({
      query: (id: string) => `/reviews/${id}/service`,
    }),
    sendReview: build.mutation<
      IReviewResponse,
      { rating: number; comment: string;serviceId:string }
    >({
      query: (body) => ({
        url: "/reviews",
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
      if (action.type === REHYDRATE && action.key === "reviews") {
        return action.payload;
      }
    }
  },
});

export const {useGetMyReviewsQuery,useGetReviewsByServiceIdQuery,useGetReviewsQuery,useSendReviewMutation} = reviewsApi;
