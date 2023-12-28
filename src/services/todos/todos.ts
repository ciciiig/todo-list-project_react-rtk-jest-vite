const getTodos = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1",
    // "https://jsonplaceholder.typicodezzz.com/todos?userId=1",
  )
  return await response.json()
}

export const todosService = {
  getTodos,
}
