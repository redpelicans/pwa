import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SingleTodo extends Component {
  state = {
    title: this.props.todo.title,
    buttonDelete: false,
  }

  handleDeleteButton = () => {
    const { deleteTodo, todo } = this.props;
    deleteTodo(todo);
    this.setState({ buttonDelete: true });
  };

  handleModif = ({ key, target: { value } }) => {
    const { updateTodo, todo } = this.props;
    if (!key) return updateTodo('completed', !todo.completed, todo);
    if (key === 'Enter') return updateTodo('title', value, todo);
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ title: value });
  }

  render() {
    const { todo } = this.props;
    const { title, buttonDelete } = this.state;
    return (<li key={`li_${todo._id}`}>
      <div className="view" >
        <input className="toggle" type="checkbox" defaultChecked={todo.completed} onClick={this.handleModif} />
        <input type="text" className="labels" value={title} onChange={this.handleChange} onKeyPress={this.handleModif} />
        <button className="destroy" onClick={this.handleDeleteButton} disabled={buttonDelete} />
      </div>
      <input id={`input_${todo._id}`} className="edit" defaultValue={todo.title} />
    </li>);
  }
}

SingleTodo.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
};

export default SingleTodo;
