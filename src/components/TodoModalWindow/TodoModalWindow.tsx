import "./TodoModalWindow.css"
import { FC, MouseEventHandler, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { selectTodoModal, setIsOpen } from "../../redux/todoModal"

export const TodoModalWindow: FC = () => {
  const dispatch = useAppDispatch()
  const { originalTodo } = useAppSelector(selectTodoModal)
  const [textAreaValue, setTextAreaValue] = useState("")

  const handleCloseModalWindow: MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = (clickEvent) => {
    const { id } = clickEvent.target as HTMLDivElement | HTMLButtonElement
    if (id === "modal-back" || id === "modal-window-header__close-button") {
      dispatch(setIsOpen(false))
    }
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
        <div className="modal-window-edited-post" id="modal-window-edited-post">
          <h3 style={{ color: "black" }}>
            Status: {originalTodo?.completed ? "Completed" : "In progress"}
          </h3>

          <textarea
            id="modal-window-edited-post__edited-text"
            style={{ resize: "none" }}
            cols={40}
            rows={6}
            defaultValue={textAreaValue || originalTodo?.title}
            // onChange={handleTextAreaOnChange}
          />
        </div>
        <div
          className="modal-window-acton-buttons-container"
          id="modal-window-acton-buttons-container"
        >
          <button
            className="modal-window-acton-buttons-container__confirm-button"
            id="modal-window-acton-buttons-container__confirm-button"
            // onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
