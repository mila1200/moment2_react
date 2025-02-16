import { useState, useEffect } from "react"
import Todo from "./Todo"

export interface TodoInterface {
    _id?: string,
    title: string,
    description: string,
    status: string
}

function TodoList() {

    //states för komponenten
    const [todos, setTodos] = useState<TodoInterface[] | []>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchData();
    }, [])

    //hämta data
    const fetchData = async () => {
        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/todo");

            if (!res.ok) {
                throw Error("Det blev ett fel: " + res.status);
            }

            const data = await res.json();
            setTodos(data);


        } catch (error) {
            setError("Det blev ett fel vid inhämtning av poster...");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            {loading && <p>Laddar...</p>}
            {error && <p>{error}</p>}

            {
                todos.map((todo) => (
                    <Todo todo={todo} key={todo._id} onTodoUpdate={fetchData} />
                ))
            }
        </section>
    )
}

export default TodoList