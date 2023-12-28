import "./Todos.css"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { Todo, fetchTodos, mergeTodos, selectTodos } from "../../redux/todos"
import { FC, FormEvent, useEffect, useRef, useState } from "react"
import { changeCheckedStatus, deleteTodo } from "../../redux/todos/actions"
import {
  selectTodoModal,
  setClickedTodoId,
  setIsOpen,
  setOriginalTodo,
} from "../../redux/todoModal"
import { TodoModalWindow } from "../TodoModalWindow/TodoModalWindow"
import { SkeletonLoader } from "../SkeletonLoader/SkeletonLoader"

export const Todos: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  let { allTodos } = useAppSelector(selectTodos)
  let todoModal = useAppSelector(selectTodoModal)
  const [inputValue, setInputValue] = useState("")
  const [completedToggle, setCompletedToggle] = useState(false)

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

      if (inputRef.current) {
        inputRef.current.focus()
      }
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

  const handleClickTodo = (todo: Todo) => {
    const { id, key } = todo
    dispatch(setClickedTodoId(id || key))
    dispatch(setIsOpen(true))
    dispatch(setOriginalTodo(todo))
  }

  return (
    <div className="todos">
      <SkeletonLoader />
      {todoModal.isOpen && <TodoModalWindow />}

      <form onSubmit={addTodo}>
        <label htmlFor="newTodo">Add Todo Item:</label>
        <input
          onChange={(e) => {
            setInputValue(() => e.target.value)
          }}
          type="text"
          autoComplete="off"
          autoFocus
          id="newTodo"
          value={inputValue}
          ref={inputRef}
        />
        <button>add</button>
      </form>
      <div className="toggle-container">
        <h1>Todo List</h1>
        <div className="toggle">
          <p>Show Only Completed Todos</p>
          <label className="switch">
            <input
              onChange={() => setCompletedToggle(!completedToggle)}
              type="checkbox"
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <ul>
        {allTodos.length === 0 && "No Todos"}
        {allTodos
          .filter((todo) => {
            if (completedToggle) {
              return todo.completed
            }
            return true
          })
          .map((todo) => {
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
                  <button
                    id={todo.key}
                    onClick={() => handleClickTodo(todo)}
                    className="modal-button"
                  >
                    📃
                  </button>
                  <button
                    onClick={() => dispatch(deleteTodo(todo.key))}
                    className="delete-button"
                  >
                    ✖️
                  </button>
                </label>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
