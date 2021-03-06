import axios from 'axios';

const config = () => {
  const token = localStorage.getItem('user_auth');

  return {
    headers: {
      authorization: `Bearer ${token}`,
    }
  };
}

export function updateName(dataToSubmit) {
  return axios.patch(`${process.env.REACT_APP_URI}${process.env.REACT_APP_USER_SERVER}/update`, dataToSubmit, config());
}
