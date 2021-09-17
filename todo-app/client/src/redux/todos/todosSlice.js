import { createSlice } from "@reduxjs/toolkit";
import {
  getTodosAsync,
  addTodoAsync,
  toggleTodoAsync,
  removeTodoAsync,
  removeCompletedTodosAsync,
} from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem("activeFilter")
      ? localStorage.getItem("activeFilter")
      : "alls",
    addNewTodo: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    // addTodo: {
    //   reducer: (state, action) => {
    //     state.items.push(action.payload);
    //   },
    //   prepare: ({ title }) => {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         isCompleted: false,
    //         title,
    //       },
    //     };
    //   },
    // },
    // toggle: (state, action) => {
    //   const id = action.payload;

    //   const item = state.items.find((item) => item.id === id);
    //   item.isCompleted = !item.isCompleted;
    // },
    // destroy: (state, action) => {
    //   const id = action.payload;

    //   const filteredItems = state.items.filter((item) => item.id !== id);
    //   state.items = filteredItems;
    // },
    // clearCompleted: (state) => {
    //   const filteredItems = state.items.filter((item) => !item.isCompleted);
    //   state.items = filteredItems;
    // },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: {
    //#region Get Todos
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    //#endregion
    //#region Add Todos
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodo.isLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.addNewTodo.isLoading = false;
      state.items.push(action.payload);
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodo.isLoading = false;
      state.addNewTodo.error = action.error.message;
    },
    //#endregion
    //#region Toggle Todos
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, isCompleted } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].isCompleted = isCompleted;
    },
    //#endregion
    //#region Remove Todos
    [removeTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    //#endregion
    //#region Remove Completed Todos
    [removeCompletedTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    //#endregion
  },
});

//#region Selectors
export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }

  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.isCompleted === false
      : todo.isCompleted === true
  );
};
export const selectActiveFilter = (state) => state.todos.activeFilter;
//#endregion

export const { changeActiveFilter } = todosSlice.actions;
export default todosSlice.reducer;
