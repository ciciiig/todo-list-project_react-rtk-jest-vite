import { Todo } from "../todos"

export type TodoModalState = {
  isOpen: boolean
  clickedTodoId: string | null
  originalTodo: Todo | undefined
  editedTodo: Todo | undefined
}
