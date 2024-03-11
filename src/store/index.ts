import { todosApi } from "@/services/todosApi";
import { configureStore } from "@reduxjs/toolkit";
import { paginationSlice } from "./features/pagination";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = () => {
  return configureStore({
    reducer: {
      pagination: paginationSlice.reducer,
      [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todosApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper(makeStore);
