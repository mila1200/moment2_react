import { useState } from "react";
import "./DeleteButton.css"

function DeleteButton({ todoId, onDelete }: { todoId: string; onDelete: Function}) {

     const [error, setError] = useState<string | null>(null)

     //skickar ett anrop till api för att ta bort post baserat på id. Om begäran lyckas anropas onDelete för att uppdatera.
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
            setError("Det gick inte att radera posten");
        }
    }


  return (
    <>
    <button className="deleteBtn" onClick={deleteTodo}>Radera</button>
    <br />
    {error && <span className="errorMsg">{error}</span>}
    </>
  )
}

export default DeleteButton