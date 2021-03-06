import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import swal from 'sweetalert';

import { getMySchedule } from './../../../apis/scheduleApi';

import { getCalendarTheme } from './../../../apis/calendarApi';

import ScheduleComponent from './Schedule';
import CalendarComponent from './Calendar/Calendar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px calc(23%);
  margin: 0 auto;

  @media only screen and (max-width: 1400px) {
    padding: 20px calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 45px calc(18%);
  }
`;

function SchedulePage({ user }) {
  const [Schedule, setSchedule] = useState([]);
  const [Calendars, setCalendars] = useState([]);

  useEffect(() => {
    getSchedule();
    getCalendar();
  }, []);
  
  const getSchedule = () => {
    getMySchedule()
      .then(response => {
        setSchedule(response.data.data);
      })
      .catch(error => {
        console.error('error occured in SchedulePage.js - getMySchedule() ', error);

        swal({
          title: '일정을 가져올 수 없습니다.',
          text: '잠시 후 다시 시도해주세요'
        });
      });
  }

  const getCalendar = () => {
    getCalendarTheme()
      .then(response => {
        setCalendars(response.data.data);
      })
      .catch(error => {
        console.error('error occured in SchedulePage.js - getMySchedule() ', error);

        swal({
          title: '일정을 가져올 수 없습니다.',
          text: '잠시 후 다시 시도해주세요'
        });
      });
  }

  return (
    <Container>
      <CalendarComponent Calendars={Calendars} setCalendars={setCalendars} getCalendar={getCalendar} />
      <ScheduleComponent
        user={user}
        Schedule={Schedule}
        setSchedule={setSchedule}
        Calendars={Calendars}
        setCalendars={Calendars}
        getSchedule={getSchedule}
      />
    </Container>
  );
}

export default SchedulePage;
