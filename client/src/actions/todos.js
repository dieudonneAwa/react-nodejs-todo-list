import apiCall from "../apiCall";

export const createTodo = (dispatch) => async (todo, Cookies) => {
  try {
    dispatch({ type: 'CREATE_TODO_LOADING' });
    const res = await apiCall('/todos', 'post', todo, Cookies.get('token'));
    dispatch({ type: 'CREATE_TODO_SUCCESS', payload: res.data })
    return res;
  } catch (err) {
    return dispatch({ type: 'CREATE_TODO_FAILURE' })
  }
};

export const fetchTodos = (dispatch) => async (Cookies) => {
  try {
    dispatch({ type: 'FETCH_TODOS_LOADING' });
    const res = await apiCall('/todos', 'get', null, Cookies.get('token'));
    dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: res.data })
    return res;
  } catch (err) {
    if (err && err.response) {
      return dispatch({ type: 'FETCH_TODOS_FAILURE', payload: err.response.data })
    }
  }
}
