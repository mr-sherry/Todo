import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoItem = ({ todo }) => {
  const { deleteTodo, completeTodo, updateTodo } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);


  return (
    <div
      className={`todo-item ${todo.completed ? "completed-bg" : "pending-bg"}`}
    >
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => completeTodo(todo.id)}
      />
      <input
        type="text"
        className={`todo-text-input ${isTodoEditable ? "editable" : ""} ${todo.completed ? "line-through" : ""
          }`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="todo-action-btn"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            updateTodo(todo.id, todoMsg);
            setIsTodoEditable(false)
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      <button className="todo-action-btn" onClick={() => deleteTodo(todo.id)}>
        ❌
      </button>
    </div>
  );
};

export default TodoItem;
