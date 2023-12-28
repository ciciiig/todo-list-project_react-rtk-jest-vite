import "./TodoModalWindow.css"
import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  selectTodoModal,
  setEditedTodo,
  setIsOpen,
} from "../../redux/todoModal"
import { Todo } from "../../redux/todos"

export const TodoModalWindow: FC = () => {
  const dispatch = useAppDispatch()
  const { originalTodo } = useAppSelector(selectTodoModal)
  const [textAreaValue, setTextAreaValue] = useState("")

  if (!originalTodo) return null

  const handleCloseModalWindow: MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = (clickEvent) => {
    const { id } = clickEvent.target as HTMLDivElement | HTMLButtonElement
    if (id === "modal-back" || id === "modal-window-header__close-button") {
      dispatch(setIsOpen(false))
    }
  }

  const handleTextAreaOnChange: ChangeEventHandler<HTMLTextAreaElement> = (
    changeEvent,
  ) => {
    const { value } = changeEvent.currentTarget
    setTextAreaValue(value)
  }

  const handleConfirm = () => {
    const editedTodo: Todo = {
      ...originalTodo,
      title: textAreaValue,
    }

    dispatch(setIsOpen(false))
    dispatch(setEditedTodo(editedTodo))
    // dispatch(updateTodo(editedTodo))

    // todos.patchRequests[originalTodo.id]?.abort()
    // const promise = dispatch(patchTodo(editedTodo))
    // dispatch(
    //   setPatchRequest({
    //     id: originalTodo!.id,
    //     fetchObject: promise,
    //   }),
    // )
  }

  return (
    <div
      className="modal-back"
      id="modal-back"
      onClick={handleCloseModalWindow}
    >
      <div className="modal-window" id="modal-window">
        <div className="modal-window-header" id="modal-window-header">
          <button
            id="modal-window-header__close-button"
            className="modal-window-header__close-button"
          >
            X
          </button>
        </div>
        <div className="modal-window-edited-todo" id="modal-window-edited-todo">
          <h3 style={{ color: "black" }}>
            Status: {originalTodo?.completed ? "Completed" : "In progress"}
          </h3>

          <textarea
            id="modal-window-edited-todo__edited-text"
            style={{ resize: "none" }}
            cols={40}
            rows={6}
            defaultValue={textAreaValue || originalTodo?.title}
            onChange={handleTextAreaOnChange}
          />
        </div>
        <div
          className="modal-window-acton-buttons-container"
          id="modal-window-acton-buttons-container"
        >
          <button
            className="modal-window-acton-buttons-container__confirm-button"
            id="modal-window-acton-buttons-container__confirm-button"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
