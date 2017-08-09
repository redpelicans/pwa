import React, { Component } from 'react';
import { createStructuredSelector, createSelector } from 'reselect';
import { connect } from 'react-redux';
import { addTodo } from './actions/todos';
import R from 'ramda';
import './index.css';
const createTodoListItem = (todo) =>  
  <li key={`li_${todo._id}`}>
    <div className="view" >
        <input className="toggle" type="checkbox" defaultChecked={todo.completed} />
        <label> {todo.title} </label>
        <button className="destroy" />
    </div>
    <input className ={`input_${todo._id}`} className="edit" defaultValue={todo.title} />
   </li>;
   
class App extends Component {

  handleKeyPress = ({ key, target: { value }}) => {
    if (key === 'Enter') {
      const { addTodo } = this.props;
      addTodo(value);
      
    };
  };

  render() {
    const { todos } = this.props;
    if(!todos) return null;
    return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" type="text" placeholder="What needs to be done?" onKeyPress={this.handleKeyPress} />
      </header>
      <section className="main">
        <ul className="todo-list">
          {todos.map(({ doc }) => createTodoListItem(doc))}
        </ul>
      </section>
    </div>);
  }
}

const getState = (state) => state.todos;

const mapStateToProps = createStructuredSelector({
  todos: createSelector([getState], (state) => state.listTodos),
});

const mapDispatchToProps = {
  addTodo,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
