import apiCall from '../apiCall';

export const signUp = (user) => async dispatch => {
  const res = await apiCall('/auth/sign_up', 'post', user);
  return dispatch({ type: 'SIGNUP_USER', payload: res.data });
};

export const signIn = (user) => async dispatch => {
  const res = await apiCall('/auth/sign_in', 'post', user);
  return dispatch({ type: 'SIGNIN_USER', payload: res.data });
};
