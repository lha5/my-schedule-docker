import axios from 'axios';

const config = () => {
  const token = localStorage.getItem('user_auth');

  return {
    headers: {
      authorization: `Bearer ${token}`,
    }
  };
}

export function getChallenging() {
  return axios.get(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CHALLENGE_SERVER}/challenging`, config());
}

export function createChallenge(dataToSubmit) {
  return axios.post(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CHALLENGE_SERVER}`, dataToSubmit, config());
}

export function getMyChallenge(challengeId) {
  return axios.get(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CHALLENGE_SERVER}/detail?id=${challengeId}`, config());
}

export function getAllMyChallenge() {
  return axios.get(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CHALLENGE_SERVER}`, config());
}

export function updateMyChallenge(challengeId, dataToSubmit) {
  return axios.patch(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CHALLENGE_SERVER}?id=${challengeId}`, dataToSubmit, config());
}

export function deleteChallenge(challengeId) {
  return axios.delete(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CHALLENGE_SERVER}?id=${challengeId}`, config());
}
