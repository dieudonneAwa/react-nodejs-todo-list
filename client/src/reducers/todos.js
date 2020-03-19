import { initialState } from "../context/todosContext";

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_TODO_LOADING':
      return { ...state };
    case 'CREATE_TODO_SUCCESS':
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };
    case 'CREATE_TODO_FAILURE':
      return {
        ...state,
        createTodoError: action.payload.error
      };

    case 'FETCH_TODOS_LOADING':
      return {
        ...state,
      };
    case 'FETCH_TODOS_SUCCESS':
      console.log(action)
      return {
        ...state,
        todos: action.payload,
      };
    case 'FETCH_TODOS_FAILURE':
      return {
        ...state,
        fetchTodosError: action.error,
      };

    default:
      return state;
  }
}

export default todosReducer;
