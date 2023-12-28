import { Todo } from "../../redux/todos"

export type PatchTodoArgs = {
  signal: AbortSignal
  todo: Todo
}
