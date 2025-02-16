//importera states

import AddTodo from "./components/AddTodo"
import TodoList from "./components/TodoList"


function App() {

  return (
    <main>
      <h1>Att göra</h1>

      <TodoList />

      <AddTodo />
    </main>
  )
}

export default App
