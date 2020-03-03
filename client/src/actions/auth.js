import apiCall from '../apiCall';

export const signUp = (dispatch) => async (user) => {
  try {
    dispatch({ type: 'SIGNUP_USER_LOADING' });
    const res = await apiCall('/auth/sign_up', 'post', user);
    dispatch({ type: 'SIGNUP_USER_SUCCESS', payload: res.data });
    return res;
  } catch (err) {
    return dispatch({ type: 'SIGNUP_USER_FAILURE', payload: err.response.data });
  }
};

export const signIn = (user) => async dispatch => {
  const res = await apiCall('/auth/sign_in', 'post', user);
  return dispatch({ type: 'SIGNIN_USER', payload: res.data });
};
