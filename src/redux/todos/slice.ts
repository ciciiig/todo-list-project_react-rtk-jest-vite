import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchTodos } from "./"
import { Todo, TodosState } from "./"
import { addProperties } from "../../utils/addProperties"

const initialState: TodosState = {
  allTodos: [],
  skeletonStatus: "idle",
  error: undefined,
}

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // merge todos from API with todos created by user with input
    mergeTodos(state, action: PayloadAction<Todo[]>) {
      state.allTodos = [...action.payload, ...state.allTodos]
    },
    changeCheckedStatus(state, action) {
      state.allTodos.map((todo) => {
        const { completed } = action.payload
        if (todo.key === action.payload.key) {
          todo.completed = completed
        }
        return todo
      })
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state: TodosState) => {
        state.skeletonStatus = "loading"
      })
      .addCase(
        fetchTodos.fulfilled,
        (state: TodosState, action: PayloadAction<Todo[]>) => {
          state.skeletonStatus = "idle"
          state.allTodos = action.payload
          // add properties to the todos
          addProperties(state.allTodos)
        },
      )
      .addCase(fetchTodos.rejected, (state: TodosState, action) => {
        state.skeletonStatus = "failed"
        state.error = `${action.error.name}: ${action.error.message}`
      })
  },
})
