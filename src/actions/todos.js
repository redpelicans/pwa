export const LOAD_TODOS = "LOAD_TODOS";
export const ADD_TODO = "ADD_TODO";

export const loadTodos = (todos) => ({ type: LOAD_TODOS, payload: {todos} });
export const addTodo = (todo) => ({ type: ADD_TODO, payload: {todo} });