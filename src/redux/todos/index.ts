import { todosSlice } from "./slice"
import { TodosState, Todo } from "./type"
import { selectTodos } from "./selectors"
import { mergeTodos, fetchTodos } from "./actions"

// export reducer
export const todosReducer = todosSlice.reducer
// export types
export type { TodosState, Todo }
// export selectors
export { selectTodos }
// export actions
export { mergeTodos, fetchTodos }
