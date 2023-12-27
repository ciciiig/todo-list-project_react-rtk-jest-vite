import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Todo } from "../todos"
import { TodoModalState } from "."

const initialState: TodoModalState = {
  isOpen: false,
  clickedTodoId: null,
  originalTodo: undefined,
  editedTodo: undefined,
}

export const todoModalSlice = createSlice({
  name: "todoModal",
  initialState,
  reducers: {
    setClickedTodoId: (state, action: PayloadAction<string>) => {
      state.clickedTodoId = action.payload
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    setOriginalTodo: (state, action: PayloadAction<Todo>) => {
      state.originalTodo = action.payload
    },
    setEditedTodo: (state, action: PayloadAction<Todo>) => {
      state.editedTodo = action.payload
    },
  },
})
