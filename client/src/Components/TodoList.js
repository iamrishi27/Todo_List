import React, { useEffect, useState } from 'react';
import axios from 'axios';


const TodoList = ({ todos, setTodos }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
    };

    fetchTodos();
  }, [setTodos]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSave = async (id) => {
    const response = await axios.put(`http://localhost:5000/todos/${id}`, { text: editText });
    setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    setEditId(null);
  };

  return (
    
    <ul >
      {todos.map(todo => (
        <li key={todo._id}>
          {editId === todo._id ? (
            <>
              <input 
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button className='btn' onClick={() => handleSave(todo._id)}>Save</button>
            </>
          ) : (
            <>
            <div className='text'>{todo.text}</div>
              
              <button className='btn' onClick={() => handleEdit(todo._id, todo.text)}>Edit</button>
              <button className='btn' onClick={() => handleDelete(todo._id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
   
  );
};

export default TodoList;
