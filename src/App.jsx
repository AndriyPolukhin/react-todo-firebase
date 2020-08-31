import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@material-ui/core';
import './App.css';
import Todo from './Todo';

const App = () => {
  const [todos, setTodos] = useState([
    'Buy Tickets to Berlin',
    'Get a negative COVID test',
    'Meet Anastasia in Berlin',
  ]);
  const [input, setInput] = useState('');

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, input]);
    setInput('');
  };

  return (
    <div className="App">
      <h1>Hello, you coder</h1>
      <form>
        <FormControl>
          <InputLabel>Enter a Todo</InputLabel>
          <Input
            onChange={(event) => setInput(event.target.value)}
            value={input}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!input}
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((todo, i) => (
          <Todo text={todo} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default App;
