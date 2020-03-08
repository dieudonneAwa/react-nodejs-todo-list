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

export const setCurrentUser = (dispatch) => (Cookies, jwtDecode) => {
  try {
    dispatch({ type: 'SET_CURRENT_USER_LOADING' });
    const payload = jwtDecode(Cookies.get('token'));
    dispatch({ type: 'SET_CURRENT_USER_SUCCESS', payload });
  } catch (err) {
    dispatch({ type: 'SET_CURRENT_USER_FAILURE', payload: err })
  }
}

export const signIn = (dispatch) => async (user) => {
  try {
    dispatch({ type: 'SIGNIN_USER_LOADING' });
    const res = await apiCall('/auth/sign_in', 'post', user);
    dispatch({ type: 'SIGNIN_USER_SUCCESS', payload: res.data });
    return res;
  } catch (err) {
    return dispatch({ type: 'SIGNIN_USER_FAILURE', payload: err.response.data })
  }
};
