import { LOAD_TODOS, TODO_ADDED, TODO_DELETED } from '../actions/todos';
import R from 'ramda';

const todos = ( state = {}, action) => {
  const { type } = action;
  const { listTodos } = state;
  switch (type) {
    case LOAD_TODOS:
      const todos = R.reduce((acc, items) => ({ ...acc, [items._id]: items }), {}, action.payload);
      return { ...state, ...todos };
    case TODO_ADDED:
      return { ...state, [action.payload._id]: action.payload };
    case TODO_DELETED:
      const { id } = action.payload;
      return R.omit(id, state);
    default:
      return state;
  }
};

export default todos;