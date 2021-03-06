import { AUTH_USER, SIGNIN_USER } from '../_actions/user_actions_types';

function userRuducer(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case SIGNIN_USER:
      return { ...state, success: action.payload };
    default:
      return state;
  }
}

export default userRuducer;
