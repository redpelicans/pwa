// import R from 'ramda';
import { ADD_TODO } from '../actions/todos';
import { getTodosFromPouch } from '..';

const addTodo = (text, db) => {
  const todo = {
    _id: new Date().toISOString(),
    title: text,
    completed: false
  };
  db.put(todo)
    .then(res => {
      console.log('Successfully posted a todo!');
      console.log(res);
      getTodosFromPouch();
    }).catch(err => {
      console.log('Error happens');
      console.log(err);
    });
};

export const PouchDbMiddleware = (db) => ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case ADD_TODO:
    {
      const { todo } = action.payload;
      addTodo(todo, db);
    }
  }
   return next(action);
};
