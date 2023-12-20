import "./TodoItem.css"
import { FC } from "react";

export const TodoItem: FC = ({ completed, id, title, toggleTodo, deleteTodo }) => {
    return (
        <li className={`${completed ? "todo-completed" : ""}`}>
            <label>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={e => toggleTodo(id, e.target.checked)}
                />
                {title}
            </label>
            <button onClick={() => deleteTodo(id)} className="btn btn-danger">Delete</button>
        </li>
    )
}