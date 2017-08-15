const todoFormat = (text) => ({
    _id: new Date().toISOString(),
    title: text,
    completed: false
});

export const addTodo = (text, db) => {
  const todo = todoFormat(text);
  db.put(todo)
    .then(res => {
      console.log('Successfully posted a todo!');
    }).catch(err => {
      console.log(err);
      console.log('Error happens');
    });
};

export const deleteTodo = (todo, db) => {
  db.remove(todo);
};

export const updateTodo = (newText, todo, db) => {
  const newTodo = { ...todo, title: newText };
  db.put(newTodo);
};