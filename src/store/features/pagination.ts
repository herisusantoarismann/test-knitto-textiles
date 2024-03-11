import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPage: 0,
  },
  reducers: {
    changePage: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changePage } = paginationSlice.actions;

export default paginationSlice.reducer;
