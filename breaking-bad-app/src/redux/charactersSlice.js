import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const char_limit = 12;

export const fetchCharacters = createAsyncThunk(
  "characters/getCharacters",
  async (page) => {
    const res = await axios(
      `${
        process.env.REACT_APP_API_BASE_ENDPOINT
      }/characters?limit=${char_limit}&offset=${char_limit * page}`
    );
    return res.data;
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    items: [],
    page: 0,
    hasNextPage: true,
    status: "idle",
  },
  reducers: {},
  extraReducers: {
    [fetchCharacters.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCharacters.fulfilled]: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.page += 1;
      if (action.payload.length < char_limit) {
        state.hasNextPage = false;
      }
      state.status = "succeeded";
    },
    [fetchCharacters.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default charactersSlice.reducer;
