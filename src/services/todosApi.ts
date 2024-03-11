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
  tagTypes: ["Todo"],
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    listTodos: builder.query<ITodo[], void>({
      query: () => `/todos`,
    }),
    todos: builder.query<ITodo[], number | string | string[]>({
      query: (page = 0) => `/todos?_start=${page}&_limit=10`,
    }),
    addNewTodo: builder.mutation({
      query: (payload) => ({
        url: "/todos",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const { useTodosQuery, useAddNewTodoMutation } = todosApi;
