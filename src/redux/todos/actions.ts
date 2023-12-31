import { todosSlice } from "./slice"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { todosService } from "../../services/todos/todos"

export const { mergeTodos, changeCheckedStatus, deleteTodo, openModalWindow } =
  todosSlice.actions

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () =>
  todosService.getTodos(),
)
