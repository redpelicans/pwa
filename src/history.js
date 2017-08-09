import React, { Component } from 'react';
import PouchDb from 'pouchdb';

const db = PouchDb('todos');

const addTodo = (text) => {
  const todo = {
    _id: new Date().toISOString(),
    title: text,
    completed: false
  };
  db.put(todo)
    .then(res => {
      console.log('Successfully posted a todo!');
      console.log(res);
    }).catch(err => {
      console.log('Error happens');
      console.log(err);
    });
};

const showTodos = () => db.allDocs({include_docs: true, descending: true}).then(doc => {
  console.log('ok');
  return doc.rows;
});

showTodos();

const checkboxChanged = (evt, todo) => {
  todo.completed = evt.target.checked;
  db.put(todo);
};

const deleteButtonPressed = (todo) => {
  db.remove(todo);
};

function todoBlurred(evt, todo) {
  const trimmedText = evt.target.value.trim();
  if (!trimmedText) {
    db.remove(todo);
  } else {
    todo.title = trimmedText;
    db.put(todo);
  }
};

const createTodoListItem = (todo) =>  
  <li key={`li_${todo._id}`}>
    <div className="view" >
        <input className="toggle" type="checkbox" onChange={(evt) => checkboxChanged(evt, todo)}  checked={todo.completed}/>
        <label> {todo.title} </label>
        <button className="destroy" onClick={() => deleteButtonPressed(todo)} />
    </div>
    <input id={`input_${todo._id}`} className="edit" value={todo.title} onBlur={(evt) => todoBlurred(evt, todo)} />
   </li>;
class App extends Component {

  state = {
    todos: [],
  };

  componentWillMount() {
    showTodos().then((todos) => this.setState({ todos }));
  }

  handleKeyPress = ({ key, target: { value }}) => {
    if (key === 'Enter') {
      addTodo(value);
    }
  } 
  render() {
    const { todos } = this.state;
    return (
  // <section id="todoapp">
    <header id="header">
	  <h1>todos</h1>
	  <input id="new-todo" type="text" placeholder="What needs to be done?" onKeyPress={this.handleKeyPress} />
    </header>
    <section id="main">
	    <ul id="todo-list">
        {todos.map(({ doc }) => {
          return createTodoListItem(doc);
        })}
      </ul>
    {/*</section>
    <footer id="footer">
	    <span id="todo-count" />
      <div id="sync-wrapper">
        <div id="sync-success">Currently syncing</div>
        <div id="sync-error">There was a problem syncing</div>
      </div>
    </footer>*/}
  // </section>
    );
  }
}

export default App;
