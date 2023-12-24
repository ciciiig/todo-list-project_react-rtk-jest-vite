import "./TestTodos.css"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { Todo, fetchTodos, mergeTodos, selectTodos } from "../../redux/todos"
import { FC, FormEvent, useEffect, useState } from "react"
import { changeCheckedStatus } from "../../redux/todos/actions"

export const TestTodos: FC = () => {
  const dispatch = useAppDispatch()
  let { allTodos } = useAppSelector(selectTodos)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const fetchTodosAndMerge = async () => {
      await dispatch(fetchTodos())
      const todosFromLocalStorage = JSON.parse(
        localStorage.getItem("todos") || "[]",
      )
      dispatch(mergeTodos(todosFromLocalStorage))
    }

    fetchTodosAndMerge()
  }, [dispatch])

  const addTodo = (e: FormEvent) => {
    const newItemWithProperties = createNewTodoObjectUsingInputValue(inputValue)

    e.preventDefault()

    if (inputValue) {
      updateLocalStorage(newItemWithProperties)

      dispatch(mergeTodos(newItemWithProperties))

      setInputValue("")
    }
  }

  const updateLocalStorage = (newTodo: Todo[]) => {
    const currentStorage = JSON.parse(localStorage.getItem("todos") || "[]")
    const updatedStorage = [...newTodo, ...currentStorage]
    localStorage.setItem("todos", JSON.stringify(updatedStorage))
  }

  const createNewTodoObjectUsingInputValue = (newTodoValue: string) => {
    let date = new Date()
    date.setDate(date.getDate() + 5)
    return [
      {
        key: crypto.randomUUID(),
        title: newTodoValue,
        completed: false,
        creationDate: new Date().toLocaleDateString(),
        dueDate: date.toLocaleDateString(),
      },
    ]
  }

  return (
    <div className="testTodos">
      <form onSubmit={addTodo}>
        <label htmlFor="newTodo">Add Todo Item:</label>
        <input
          onChange={(e) => {
            setInputValue(() => e.target.value)
          }}
          type="text"
          autoComplete="off"
          id="newTodo"
          value={inputValue}
        />
        <button>add</button>
      </form>
      <h1>Todo List</h1>
      <ul>
        {allTodos.length === 0 && "No Todos"}
        {allTodos.map((todo) => {
          return (
            <li
              key={todo.key}
              className={`${todo.completed ? "todo-completed" : ""}`}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) =>
                    dispatch(
                      changeCheckedStatus({
                        key: todo.key,
                        completed: e.target.checked,
                      }),
                    )
                  }
                />
                {todo.title}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
