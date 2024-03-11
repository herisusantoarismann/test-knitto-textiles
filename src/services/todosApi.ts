import type { Action, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "@/types/todos";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

type RootState = any; // normally

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    todos: builder.query<ITodo[], number | void>({
      query: (page = 0) => `/todos?_start=${page}&_limit=10`,
    }),
  }),
});

export const { useTodosQuery } = todosApi;
