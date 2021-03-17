import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input, List } from '@material-ui/core';
import Todo from './Todo';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { green } from '@material-ui/core/colors';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //When the app loads, we need to listten to the db and fetch new todos 
  useEffect(() => {
    //this code here... fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })

  }, [])


  const addTodo = (event) => {
    //this will fire off when we click the button  
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input]);
    setInput('');  //clear input after click enter
  }

  return ( 
    <div className="App">
      <img src="todo.jpg" alt="back" className="back__img"/>
      <h1>Simple todo app!!! <DoneAllIcon style={{ color: green[500] }}/></h1>
      <form>
        <FormControl>
          <InputLabel>
            Write a Todo 
          </InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        <Button disabled={!input} type="submit" variant="contained" color="primary" onClick={addTodo}>
          Add Todo
        </Button>
      </form>
      <div>
      <List className='todo__list'>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </List>
     </div>
    </div>
  );
}

export default App;
