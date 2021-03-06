import axios from 'axios';

import { AUTH_USER } from './user_actions_types';

const user_token = localStorage.getItem('user_auth');
const config = {
  headers: {
    Authorization: `Bearer ${user_token}`
  }
};

export function auth() {
  const request = axios
    .get(`${process.env.REACT_APP_URI}${process.env.REACT_APP_USER_SERVER}/auth`, config)
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
}
