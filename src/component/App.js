import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { getVisibleTodos } from '../selectors';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from '../actions/todos';

const createTodoListItem = (todo, handleDeleteButton, handleModif) =>  
  <li key={`li_${todo._id}`}>
    <div className="view" >
        <input className="toggle" type="checkbox" defaultChecked={todo.completed} />
        <input type="text" className="labels" defaultValue={todo.title} onKeyPress={handleModif(todo)} /> 
        <button className="destroy" onClick={() => handleDeleteButton(todo)}/>
    </div>
    <input id={`input_${todo._id}`} className="edit" defaultValue={todo.title} />
   </li>; 

class App extends Component {

  handleKeyPress = ({ key, target: { value }}) => {
    if (key === 'Enter') {
      const { addTodo } = this.props;
      addTodo(value);
    };
  };

  handleDeleteButton = (todo) => {
    console.log('habdleDeleteButton');
    const { deleteTodo } = this.props;
    deleteTodo(todo);
  };

    handleModif = (todo) => ({ key, target: { value }}) => {
    if (key === 'Enter') {
      const { updateTodo } = this.props;
      updateTodo(value, todo);
    };
    console.log(value);
  };

  render() {
    const { todos } = this.props;
    if(!todos) return null;
    console.log(todos);
    return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" type="text" placeholder="What needs to be done?" onKeyPress={this.handleKeyPress} />
      </header>
      <section className="main">
        <ul className="todo-list">
          {(todos).map((doc) => createTodoListItem(doc, this.handleDeleteButton, this.handleModif), todos)}
        </ul>
      </section>
    </div>);
  }
}

const mapStateToProps = createStructuredSelector({
  todos: getVisibleTodos,
});

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  updateTodo,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
