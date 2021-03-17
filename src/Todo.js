import { ListItem, ListItemText, Button, Modal, Input } from '@material-ui/core';
import React, {useState} from 'react';
import './Todo.css';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Todo(props) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');



    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})   
        setOpen(false);
    }

    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}>
            <div className="modal__todo">
                <h1>Open</h1>
                <Input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button variant="contained" color="primary" onClick={updateTodo}>Update Todo</Button>
            </div>
        </Modal>
        
        <ListItem>
            <ListItemText primary={props.todo.todo} secondary="Dummy deadline" />
            <Button variant="contained" color="primary" onClick={e => setOpen(true)}>Edit</Button>
            <DeleteForeverIcon fontSize="large" color="secondary" onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
        </ListItem>
        
        </>
    )
}

export default Todo
 