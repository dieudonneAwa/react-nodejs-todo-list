import { initialState } from "../context/authContext";

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_USER_SUCESS':
      return { ...state, user: action.payload.user, isAuthenticated: true };
    case 'SIGNIN_USER': 
      return { ...state, user: action.payload.user, isAuthenticated: true };
    default:
      return state;
  }
}

export default auth;
