import { createSelector } from 'reselect';
import R from 'ramda';

const getStateTodos = (state) => state.todos.listTodos;

export const getVisibleTodos = createSelector(
  [getStateTodos], (state) => R.values(state),
);