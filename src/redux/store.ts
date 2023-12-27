import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { todosReducer } from "./todos"
import { todoModalReducer } from "./todoModal"

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    todoModal: todoModalReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
