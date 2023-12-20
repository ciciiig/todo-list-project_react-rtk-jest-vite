import { FC, FormEvent, useState } from "react";

export const NewTodoForm: FC = ({ onSubmit }) => {
    const [newItem, setNewItem] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newItem === "") return

        onSubmit(newItem)

        setNewItem('')
    }

    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label htmlFor="item">New Item</label>
                <input
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    autoComplete="off"
                    type="text"
                    id="item"
                />
            </div>
            <button>Add</button>
        </form>
    )
}