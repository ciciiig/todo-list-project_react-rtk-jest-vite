import { todoModalSlice } from "./slice"
import { selectTodoModal } from "./selectors"
import {
  setClickedTodoId,
  setIsOpen,
  setOriginalTodo,
  setEditedTodo,
} from "./actions"
import { TodoModalState } from "./type"

// export reducer
export const todoModalReducer = todoModalSlice.reducer
// export selectors
export { selectTodoModal }
// export actions
export { setClickedTodoId, setIsOpen, setOriginalTodo, setEditedTodo }
// export types
export type { TodoModalState }
