import { useState } from "react";

function DeleteButton({ todoId, onDelete }: { todoId: string; onDelete: Function}) {

     const [error, setError] = useState<string | null>(null)

    const deleteTodo = async () => {
        try {
            const res = await fetch("http://localhost:5000/todo/" + todoId, {
                method: "DELETE"
            });

            if(!res.ok) {
                throw new Error("Fel vid radering av post");
            }

            onDelete();
        } catch (error) {
            setError("Det blev fel");
        }
    }


  return (
    <>
    <button onClick={deleteTodo}>Radera</button>
    </>
  )
}

export default DeleteButton