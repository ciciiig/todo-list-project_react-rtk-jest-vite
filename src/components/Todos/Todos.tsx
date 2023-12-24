// import { FC, useEffect, useState } from "react"
// import { NewTodoForm } from "./NewTodoForm/NewTodoForm"
// import { TodoList } from "./TodoList/TodoList"
// import { useAppDispatch, useAppSelector } from "../../redux/hooks"
// import { selectTodos } from "../../redux/todos/selectors"
// import { fetchTodos } from "../../redux/todos/actions"
// import { Todo } from "../../redux/todos/type"

// export const Todos: FC = () => {
//   const dispatch = useAppDispatch()
//   const todosState = useAppSelector(selectTodos)
//   const [todos, setTodos] = useState([])

//   useEffect(() => {
//     dispatch(fetchTodos())
//   }, [dispatch])

//   useEffect(() => {
//     if (todosState.skeletonStatus === "idle") {
//       setTodos(todosState.allTodos)
//     }
//   }, [todosState.skeletonStatus, todosState.allTodos])

//   useEffect(() => {
//     localStorage.setItem("items", JSON.stringify(todos))
//   }, [todos])

//   const addTodo = (title) => {
//     setTodos((currentTodos) => {
//       return [
//         ...currentTodos,
//         { id: crypto.randomUUID(), title, completed: false },
//       ]
//     })
//   }

//   const toggleTodo = (id, completed) => {
//     setTodos((currentTodos) => {
//       return currentTodos.map((todo: Todo) => {
//         if (todo.id === id) {
//           return { ...todo, completed }
//         }

//         return todo
//       })
//     })
//   }

//   const deleteTodo = (id) => {
//     setTodos((currentTodos) => {
//       return currentTodos.filter((todo: Todo) => todo.id !== id)
//     })
//   }

//   return (
//     <>
//       <NewTodoForm onSubmit={addTodo} />

//       <h1 className="header">Todo List</h1>

//       <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
//     </>
//   )
// }
