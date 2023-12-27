export type TodosState = {
  allTodos: Todo[]
  skeletonStatus: "idle" | "loading" | "failed"
  error: string | undefined
  isModalWindowOpen: boolean
}

export type Todo = {
  userId?: number
  id?: string
  key: string
  title: string
  completed: boolean
  creationDate: string
  dueDate: string
}
