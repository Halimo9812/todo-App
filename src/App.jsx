import React, { useState } from 'react';
import "./App.css";
import { initialState } from './todo-data';

const TodoItem = ({ todo, onToggle, onEdit, onDelete, isEditing, onSave, editValue, setEditValue }) => {
  return (
    <div>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => onToggle(todo.id)} 
      />
      {isEditing ? (
        <input 
          type="text" 
          value={editValue}  // Fixed this line
          onChange={(e) => setEditValue(e.target.value)} 
        />
      ) : (
        <span>{todo.text}</span>
      )}
      {isEditing ? (
        <button onClick={onSave}>Save</button>
      ) : (
        <>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete} disabled={!todo.completed}>Delete</button>
        </>
      )}
    </div>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');  // Fixed state name to 'title'
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (title.trim()) {  // Fixed to use 'title' instead of 'inputValue'
      const newTodo = { id: Date.now(), text: title, completed: false };
      setTodos([newTodo, ...todos]); // Add new todo to the top
      setTitle('');  // Clear the input field after adding
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const editTodo = (id) => {
    setEditingTodoId(id);
    setEditValue(todos.find(todo => todo.id === id).text);
  };

  const saveTodo = () => {
    setTodos(todos.map(todo => 
      todo.id === editingTodoId ? { ...todo, text: editValue } : todo
    ));
    setEditingTodoId(null);
    setEditValue('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input 
          id='textbox'
          type="text"
          value={title}  // Fixed this line to use 'title'
          onChange={(e) => setTitle(e.target.value)}  // Fixed this line to use 'setTitle'
          placeholder="Add task"
        />
        <button id='addbtn' type="submit">Add</button>
      </form>
      <div>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onEdit={() => editTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            isEditing={editingTodoId === todo.id}
            onSave={saveTodo}
            editValue={editValue}
            setEditValue={setEditValue}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;



/*A heading labeling it as a "todo list."
A list of "todo" items, which are strings listing activities to be accomplished (e.g. "find that missing sock"). Each "todo" item should have:

A checkbox next to it which indicates whether it is "complete."
A "delete" button next to it which removes it from the list.

The "delete" button should be disabled unless the todo is complete!
An "edit" button that replaces the todo string with a text input used to edit the todo.

Hint: bind the value of this text input to a piece of state so that it is always accurate, even when first displayed!
When this text input is active, the "delete" and "edit" buttons should be hidden, and a "save" button should appear. The "save" button should save any changes made to the todo within the text input.
An input element that creates new todo items and adds them to the list.
New todos should be added to the top of the list visually; the oldest todos should be at the bottom.*/
/*<div>
    <h1> Todo List</h1>
    <form >
      <input type="text" />
      <button> Add</button>
      <div>
      <input type="checkbox"/>
        <p>create mockup</p>
        <button> Edit</button>
        <button> Delete</button>
        <input type="checkbox" />
        <h2> Create Static Layout</h2> 
        <button> Edit</button>
        <button> Delete</button>
        <input type="checkbox" />
        <input type="text" />
        <button>Save</button>
   
      </div>
    </form>
    </div>*/