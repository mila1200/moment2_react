import { useState } from "react";
import DeleteButton from "./DeleteButton";
import "./Todo.css"

function Todo({ todo, onTodoUpdate }: { todo: any, onTodoUpdate: Function }) {
    //errorstate
    const [error, setError] = useState<string | null>(null)

    const updateTodo = async (e: any) => {
        let newStatus = e.target.value;

        const newTodo = { ...todo, status: newStatus };

        try {
            const res = await fetch("http://localhost:5000/todo/" + todo._id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(newTodo)
            });

            if (!res.ok) {
                throw new Error("Det blev ett fel: " + res.status);
            }

            onTodoUpdate();

        } catch (error) {
            setError("Det blev ett fel vid uppdatering av poster.");
        }
    }

    return (
        <article className="todoArticle">
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <p>{todo.status}</p>
            <form>
                <label htmlFor="status"><strong>Ändra status:</strong></label>
                <br />
                <select name="status" id="status" defaultValue={todo.status}
                    onChange={updateTodo}>
                    <option>Ej påbörjad</option>
                    <option>Påbörjad</option>
                    <option>Avklarad</option>
                </select>
                <br />
                {error && <span className="errorMsg">{error}</span>}
            </form>
            <DeleteButton todoId={todo._id} onDelete={onTodoUpdate}/>
        </article>
    )
}

export default Todo