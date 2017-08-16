import R from 'ramda';
import { LOAD_TODOS, TODO_ADDED, TODO_DELETED } from '../actions/todos';

const todosReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_TODOS:
    {
      const todos = R.reduce((acc, items) => ({ ...acc, [items._id]: items }), {}, action.payload);
      return { ...state, ...todos };
    }
    case TODO_ADDED:
      return { ...state, [action.payload._id]: action.payload };
    case TODO_DELETED:
    {
      const { id } = action.payload;
      return R.omit(id, state);
    }
    default:
      return state;
  }
};

export default todosReducer;
