import { useRef, useState } from "react";
import { TodoProvider } from "./context/TodoContext";
import { useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";


function App() {
  const [todos, setTodos] = useState([]);
  const isInitialMount = useRef(true);


  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("todos"));
      if (Array.isArray(saved)) {
        setTodos(saved);
      }
    } catch (e) {
      console.error("Invalid todos in localStorage:", e);
    }
  }, []);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  //   console.log("setitem", todos);
  // }, [todos]);
  // useEffect(() => {
  //   try {
  //     const saved = JSON.parse(localStorage.getItem("todos"));
  //     console.log(saved);

  //     if (Array.isArray(saved)) {
  //       setTodos(saved);
  //     }
  //   } catch (e) {
  //     console.error("Invalid todos in localStorage:", e);
  //   }
  // }, []);



  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), todo, completed: false }, ...prev]
    )
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, todo } : prevTodo))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const completeTodo = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ?
      { ...prevTodo, completed: !prevTodo.completeTodo } :
      prevTodo))
  }



  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos))
  //   console.log(localStorage.setItem("todos", JSON.stringify(todos)), "setitem");

  // }, [todos])





  return <>
    <TodoProvider value={{ addTodo, updateTodo, deleteTodo, completeTodo }}>
      <div className="app-container">
        <div className="todo-box">
          <h1 className="todo-heading">Manage Your Todos</h1>
          <div className="todo-form-wrapper">
            <TodoForm />

          </div>
          <div className="todo-list">
            Loop and Add TodoItem here
            {todos.map((todo) =>
              // todo ? (
              <div key={todo.id} className="todo-item-wrapper">
                <TodoItem todo={todo} />
              </div>
              // ) : null
            )
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  </>;
}

export default App;



