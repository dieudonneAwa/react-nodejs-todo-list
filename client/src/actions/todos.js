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

export const deleteTodo = (dispatch) => async (todoId, Cookies) => {
  try {
    dispatch({ type: 'DELETE_TODO_LOADING' });
    const res = await apiCall(`/todos/${todoId}`, 'delete', null, Cookies.get('token'));
    dispatch({ type: 'DELETE_TODO_SUCCESS', payload: todoId });
    return res;
  } catch (err) {
    console.log(err)
    return dispatch({ type: 'DELETE_TODO_FAILURE', payload: err.response.data })
  }
}

export const createTask = (dispatch) => async (task, Cookies) => {
  try {
    dispatch({ type: 'CREATE_TASK_LOADING' });
    const res = await apiCall('/todoItems', 'post', task, Cookies.get('token'));
    dispatch({ type: 'CREATE_TASK_SUCCESS', payload: res.data });
    return res;
  } catch (err) {
    return dispatch({ type: 'CREATE_TASK_FAILURE' })
  }
}

export const markTaskAsDone = (dispatch) => async (task) => {
  try {
    dispatch({ type: 'MARK_AS_DONE_LOADING' });
    const res = await apiCall(`/todoItems/${task.id}`, 'put', task);
    dispatch({ type: 'MARK_AS_DONE_SUCCESS', payload: res.data });
    return res;
  } catch (err) {
    return dispatch({ type: 'MARK_AS_DONE_FAILURE', payload: err.response.data });
  }
}
