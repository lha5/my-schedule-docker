import axios from 'axios';

const config = () => {
  const token = localStorage.getItem('user_auth');

  return {
    headers: {
      authorization: `Bearer ${token}`,
    }
  };
}

export function createScehdule(dataToSubmit) {
  return axios.post(`${process.env.REACT_APP_URI}${process.env.REACT_APP_SCHEDULE_SERVER}`, dataToSubmit, config());
}

export function getMySchedule() {
  return axios.get(`${process.env.REACT_APP_URI}${process.env.REACT_APP_SCHEDULE_SERVER}`, config());
}

export function deleteSchedule(scheduleId) {
  return axios.delete(`${process.env.REACT_APP_URI}${process.env.REACT_APP_SCHEDULE_SERVER}/delete?id=${scheduleId}`, config());
}

export function updateSchedule(scheduleId, dataToSubmit) {
  return axios.patch(`${process.env.REACT_APP_URI}${process.env.REACT_APP_SCHEDULE_SERVER}/update?id=${scheduleId}`, dataToSubmit, config());
}
