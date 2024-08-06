import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <div className="todo-form">
        <TodoForm onAdd={handleAddTodo} />
      </div>
      <div className="todo-list">
        <h2>Added List </h2>
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};

export default App;
