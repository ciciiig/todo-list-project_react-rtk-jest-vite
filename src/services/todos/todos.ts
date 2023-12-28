import { PatchTodoArgs } from "."

const getTodos = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1",
  )
  return await response.json()
}

const patchTodo = async ({ signal, todo }: PatchTodoArgs) => {
  const urlTodo = `https://jsonplaceholder.typicode.com/todos/${todo.id}`
  // const urlTodo = `https://jsonplaceholderzzz.typicode.com/todos/${todo.id}`
  const options = {
    method: "PATCH",
    body: JSON.stringify(todo),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }

  const response = await fetch(urlTodo, {
    ...options,
    signal,
  })

  return await response.json()
}

export const todosService = {
  getTodos,
  patchTodo,
}
