import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchTodos } from "./"
import { Todo, TodosState } from "./"
import { addProperties } from "../../utils/addProperties"

const initialState: TodosState = {
  allTodos: [],
  skeletonStatus: "idle",
  error: undefined,
  isModalWindowOpen: false,
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
        const { completed, key } = action.payload
        if (todo.key === key) {
          todo.completed = completed
          localStorage.setItem("todos", JSON.stringify(state.allTodos))
        }
        return todo
      })
    },
    deleteTodo(state, action) {
      state.allTodos = state.allTodos.filter(
        (todo) => todo.key !== action.payload,
      )

      const storageTodos = JSON.parse(localStorage.getItem("todos") || "null")
      if (storageTodos) {
        const updated = storageTodos.filter(
          (todo: Todo) => todo.key !== action.payload,
        )
        localStorage.setItem("todos", JSON.stringify(updated))
      }
    },
    openModalWindow(state, action) {
      state.isModalWindowOpen = !action.payload
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
          addProperties(state.allTodos)
        },
      )
      .addCase(fetchTodos.rejected, (state: TodosState, action) => {
        state.skeletonStatus = "failed"
        state.error = `${action.error.name}: ${action.error.message}`
      })
  },
})
