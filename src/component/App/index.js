import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SingleTodo from '../SingleTodo';
import { getVisibleTodos } from '../../selectors';
import { addTodo, deleteTodo, updateTodo } from '../../actions/todos';

const App = ({ deleteTodo, todos, updateTodo, addTodo }) => {  // eslint-disable-line 
  const handleKeyPress = ({ key, target: { value } }) => {
    if (key === 'Enter' && value) {
      addTodo(value);
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" type="text" placeholder="What needs to be done?" onKeyPress={handleKeyPress} />
      </header>
      <section className="main">
        <ul className="todo-list">
          {(todos).map((doc) => <SingleTodo key={doc._id} todo={doc} deleteTodo={deleteTodo} updateTodo={updateTodo} />, todos)}
        </ul>
      </section>
    </div>);
};


const mapStateToProps = createStructuredSelector({
  todos: getVisibleTodos,
});

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  updateTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
