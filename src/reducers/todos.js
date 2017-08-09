import { LOAD_TODOS } from '../actions/todos';

const todos = ( state = {}, action) => {
    const { type } = action;
    switch (type) {
        case LOAD_TODOS:
            return { ...state, listTodos: action.payload.todos};
        default:
            return state;
    }
};

export default todos;