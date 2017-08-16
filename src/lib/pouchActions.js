
const todoFormat = (text) => ({
  _id: new Date().toISOString(),
  title: text,
  completed: false,
});

export const syncRemote = (db, remoteCouch, config) => {
  db.sync(remoteCouch, config);
};

export const addTodo = (text, db) => {
  const todo = todoFormat(text);
  db.put(todo)
    .then(() => {
      console.log('Successfully posted a todo in PouchDb!');
    }).catch(err => {
      console.log('Error happens trying to post a todo in PouchDb', err);
    });
};

export const deleteTodo = (todo, db) => {
  db.remove(todo);
};

export const updateTodo = (type, newData, todo, db) => {
  const newTodo = { ...todo, [type]: newData };
  db.put(newTodo);
};
