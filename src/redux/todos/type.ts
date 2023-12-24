export type TodosState = {
  allTodos: Todo[]
  skeletonStatus: "idle" | "loading" | "failed"
  error: string | undefined
}

export type Todo = {
  userId?: number
  id?: number
  key: string
  title: string
  completed: boolean
  creationDate: string
  dueDate: string
}
