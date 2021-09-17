import { createSlice } from "@reduxjs/toolkit";
import { getNotesAsync, addNoteAsync, removeNoteAsync } from "./services";

export const NotesSlice = createSlice({
  name: "Notes",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    addNewNote: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {},
  extraReducers: {
    //#region Get Notes
    [getNotesAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getNotesAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [getNotesAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    //#endregion
    //#region Add Notes
    [addNoteAsync.pending]: (state, action) => {
      state.addNewNote.isLoading = true;
    },
    [addNoteAsync.fulfilled]: (state, action) => {
      state.addNewNote.isLoading = false;
      state.items.push(action.payload);
    },
    [addNoteAsync.rejected]: (state, action) => {
      state.addNewNote.isLoading = false;
      state.addNewNote.error = action.error.message;
    },
    //#endregion
    //#region Remove Notes
    [removeNoteAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    //#endregion
  },
});

//#region Selectors
export const selectNotes = (state) => state.notes.items;
//#endregion

export default NotesSlice.reducer;
