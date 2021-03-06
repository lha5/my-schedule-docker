import axios from 'axios';

const config = () => {
  const token = localStorage.getItem('user_auth');

  return {
    headers: {
      authorization: `Bearer ${token}`,
    }
  };
}

export function getCalendarTheme() {
  return axios.get(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CALENDAR_SERVER}`, config());
}

export function getLastId() {
  return axios.get(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CALENDAR_SERVER}/last-no`, config());
}

export function createCalendarTheme(dataToSubmit) {
  return axios.post(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CALENDAR_SERVER}`, dataToSubmit, config());
}

export function deleteCalendarTheme(scheduleId) {
  return axios.delete(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CALENDAR_SERVER}/delete?id=${scheduleId}`, config());
}

export function updateCalendarTheme(scheduleId, dataToSubmit) {
  return axios.patch(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CALENDAR_SERVER}/update?id=${scheduleId}`, dataToSubmit, config());
}
