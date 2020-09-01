import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from './firebase';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import { AddCircleRounded } from '@material-ui/icons';
import { yellow, grey } from '@material-ui/core/colors';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //  * When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // * this code here... fires when the app.js loads
    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };

  return (
    <div className="App">
      <h1>List of things to Todo!</h1>
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
          <AddCircleRounded
            style={!input ? { color: grey[500] } : { color: yellow[500] }}
          />
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} id={todo.id} />
        ))}
      </ul>
    </div>
  );
};

export default App;
