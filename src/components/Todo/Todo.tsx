import { FC, useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm/NewTodoForm";
import { TodoList } from "./TodoList/TodoList";

export const Todo: FC = () => {
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("items")
        if (localValue == null) return []

        return JSON.parse(localValue)
    })

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(todos))
    }, [todos])

    const addTodo = (title) => {
        setTodos((currentTodos) => {
            return [
                ...currentTodos,
                { id: crypto.randomUUID(), title, completed: false }
            ]
        })
    }

    const toggleTodo = (id, completed) => {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed }
                }

                return todo
            })
        })
    }

    const deleteTodo = (id) => {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id)
        })
    }

    return (
        <>
            <NewTodoForm onSubmit={addTodo} />

            <h1 className="header">Todo List</h1>

            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </>
    )
}