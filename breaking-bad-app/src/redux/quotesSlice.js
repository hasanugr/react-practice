import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllQuotes = createAsyncThunk("quotes/fetchAll", async () => {
  const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/quotes`);
  return res.data;
});

export const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: {
    [fetchAllQuotes.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllQuotes.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
    [fetchAllQuotes.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const quotesItemsSelector = (state) => state.quotes.items;
export const quotesStatusSelector = (state) => state.quotes.status;
export const quotesErrorSelector = (state) => state.quotes.error;

export default quotesSlice.reducer;
