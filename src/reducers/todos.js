import { LOAD_TODOS, TODO_ADDED, TODO_DELETED } from '../actions/todos';
import R from 'ramda';

const todos = ( state = {}, action) => {
    const { type } = action;
    const { listTodos } = state;
    switch (type) {
        case LOAD_TODOS:
          const { todos: todosDb } = action.payload;
          const todos = R.reduce((acc, items) => ({ ...acc, [items.id]: items.doc }), {}, todosDb);
            return { ...state, listTodos: todos};
        case TODO_ADDED:
          console.log('addedTodo');
          const { todo } = action.payload;
            return { ...state, listTodos: { ...listTodos, ...todo }};
        case TODO_DELETED:
          const { id } = action.payload;
            return { ...state, listTodos: R.omit(id, listTodos)};
        default:
            return state;
    }
};

export default todos;