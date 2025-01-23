import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { prepareHeaders } from "@/utils/prepare_header";
import { ICategoriesResponse, ICategory, ICategoryResponse } from "@/interfaces";
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders
  }),
  endpoints: (build) => ({
    getCategories: build.query<ICategoriesResponse, void>({
      query: () => "/servicecategories",
    }),
    getCategoryById: build.query<ICategoryResponse, string>({
      query:(id:string) => `/servicecategories/${id}`
    }),
    getCategoriesByPagination: build.query<ICategoriesResponse, number>({
      query: (page: number) => `/servicecategories?page=${page}`,
    }),
    getCategoriesByCounts: build.query<ICategoriesResponse, number>({
      query: (limit: number) => `/servicecategories?limit=${limit}`,
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

export const {
  useGetCategoriesQuery,
  useGetCategoriesByCountsQuery,
  useLazyGetCategoriesByPaginationQuery,
  useGetCategoryByIdQuery,
  useGetCategoriesByPaginationQuery
} = categoryApi;
