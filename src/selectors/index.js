import { createSelector } from 'reselect';
import R from 'ramd';

const getStateTodos = (state) => state.todos;

export const getVisibleTodos = createSelector(
  [getStateTodos], (state) => R.values(state),
);
