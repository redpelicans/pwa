export const LOAD_TODOS = 'LOAD_TODOS';

export const ADD_TODO = 'ADD_TODO';
export const ADD_TODO2 = 'ADD_TODO2';
export const TODO_ADDED = 'ADDED_TODO';

export const UPDATE_TODO = 'UPDATE_TODO';

export const DELETE_TODO = 'DELETE_TODO';
export const TODO_DELETED = 'DELETED_TODO';

export const loadTodos = (todos) => ({ type: LOAD_TODOS, payload: { todos } });

export const addTodo = (todo) => ({ type: ADD_TODO, payload: todo });
export const todoAdded = (id, todo) => ({ type: TODO_ADDED, payload: { id, todo } });

export const updateTodo = (type, newData, todo) => ({ type: UPDATE_TODO, payload: { type, newData, todo } });

export const deleteTodo = (todo) => ({ type: DELETE_TODO, payload: { todo } });
export const todoDeleted = (id, todo) => ({ type: TODO_DELETED, payload: { id, todo } });
