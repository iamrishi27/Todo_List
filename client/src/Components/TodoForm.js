import React, { useState } from 'react';
import axios from 'axios';


const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      const response = await axios.post('http://localhost:5000/todos', { text });
      onAdd(response.data);
      setText('');
    }
  };

  return (

      <form onSubmit={handleSubmit}>
      <input type="text" value={text}  onChange={(e) => setText(e.target.value)}  placeholder="Enter new todo"
/>
      <button type="submit">Add Todo</button>
    </form>
   
  );
};

export default TodoForm;
