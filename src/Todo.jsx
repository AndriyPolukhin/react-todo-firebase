import React, { useState } from 'react';
import { db } from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Modal,
  Button,
  Input,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//  * Icons

import {
  ImageRounded,
  SaveRounded,
  EditRounded,
  DeleteSweepRounded,
} from '@material-ui/icons';
import { red, blue, green } from '@material-ui/core/colors';

import './Todo.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    border: '2px solid #000',
    backgroundColor: 'white',
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = ({ todo: { todo }, id }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const updateTodo = () => {
    //  * update the todo with the new input text
    db.collection('todos').doc(id).set(
      {
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    // * Close modal
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h1>I am a model</h1>
          <Input
            placeholder={todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button>
            <SaveRounded onClick={updateTodo} style={{ color: green[500] }} />
          </Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageRounded />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={todo} secondary="Dummy deadline" />

          <EditRounded
            onClick={(e) => setOpen(true)}
            style={{ color: blue[500] }}
          />
          <DeleteSweepRounded
            onClick={(event) => db.collection('todos').doc(id).delete()}
            style={{ color: red[500] }}
          />
        </ListItem>
      </List>
    </>
  );
};

export default Todo;
