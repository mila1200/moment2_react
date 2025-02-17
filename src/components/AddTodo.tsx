import { useState } from "react";
import { TodoInterface } from "./TodoList";

function AddTodo({fetchData}: {fetchData: Function}) {

    //interface för felhantering
    interface ErrorInterface {
        title?: string,
        description?: string
    }

    //state för interfacet, importerat från TodoList
    const [formData, setFormData] = useState<TodoInterface>({
        title: "",
        description: "",
        status: "Ej påbörjad",
    });

    const [error, setError] = useState<ErrorInterface>({})
    
    const validateForm = (data: TodoInterface) => {
        
        const validationError: ErrorInterface = {};

        if(!data.title && data.title.length < 3) {
            validationError.title = "Titeln måste vara minst tre tecken lång";
        }

        if(data.description.length > 200) {
            validationError.description = "Du får max använda 200 tecken.";
        }

        return validationError;
    }

    const todoAdd = async (event: any) => {
        event.preventDefault();

        const validationError = validateForm(formData);

        if(Object.keys(validationError).length > 0) {
            setError(validationError);
        } else {
            setError({});

        try {
            const res = await fetch("http://localhost:5000/addTodo", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Det blev ett fel: " + res.status);
            }

            fetchData();

            setFormData({
                title: "",
                description: "",
                status: "Ej påbörjad"
            })

        } catch (error) {
            setError({title: "Något gick fel."});
        }
    }};

    return (
        <section>
            <form onSubmit={todoAdd}>
                <label htmlFor="title">Titel:</label><br />
                <input type="text" name="title" value={formData.title} onChange={(event) => setFormData({...formData, title: event.target.value})}/>
                <br />
                {error.title && <span>{error.title}</span>}
                <br />

                <label htmlFor="description">Beskrivning:</label><br />
                <input type="text" name="description" value={formData.description} onChange={(event) => setFormData({...formData, description: event.target.value})}/>
                <br />
                {error.description && <span>{error.description}</span>}
                <br />

                <label htmlFor="status">Status:</label><br />
                <select name="status" id="addStatus" value={formData.status} onChange={(event) => setFormData({...formData, status: event.target.value})}>
                    <option>Ej påbörjad</option>
                    <option>Påbörjad</option>
                    <option>Avklarad</option>
                </select><br />

                <input type="submit" value="Spara" />
            </form>
        </section>
    )
}

export default AddTodo
