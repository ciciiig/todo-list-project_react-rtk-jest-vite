import { Todo } from "../redux/todos/type"

export const addProperties = (allTodos: Todo[]) => {
  allTodos.forEach((todo: Todo) => {
    todo.key = crypto.randomUUID()
    todo.creationDate = new Date().toLocaleDateString()
    let date = new Date()
    date.setDate(date.getDate() + 5)
    todo.dueDate = date.toLocaleDateString()
  })
}
