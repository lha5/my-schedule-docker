import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { makeStyles, Modal, Backdrop, Fade } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import swal from 'sweetalert';

import { getCalendarTheme } from '../../../../apis/calendarApi';

import MyCalendarTheme from './MyCalendarTheme';
import CalendarEditor from './CalendarEditor';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 2px solid ${props => props.theme.colors.gray};
    background-color: ${props => props.theme.colors.white};
    
    svg, path {
      color: ${props => props.theme.colors.gray};
    }

    &:hover {
      border: 2px solid ${props => props.theme.colors.darkGray};

      svg, path {
        color: ${props => props.theme.colors.darkGray};
      }
    }
  }
`;

function Calendar({ Calendars, setCalendars, getCalendar }) {
  const classes = useStyles();
  
  const [Open, setOpen] = useState(false);

  useEffect(() => {
    getCalendarData();
  }, []);

  const getCalendarData = () => {
    getCalendarTheme()
      .then(response => {
        setCalendars(response.data.data);
      })
      .catch(error => {
        console.error('error occured in MyCalendarTheme.js - getCalendarTheme() ', error);

        swal({
          title: '캘린더 테마를 불러올 수 없습니다.',
          icon: 'error'
        });
      });
  }

  const handleOpenModal = () => {
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false);
  }

  return (
    <Container>
      <MyCalendarTheme CalendarData={Calendars} />
      <button
        type="button"
        onClick={handleOpenModal}
        data-tip="일정 구분 편집"
        data-effect="solid"
        data-place="left"
      >
        <AddOutlined />
      </button>
      <ReactTooltip />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={Open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={Open} disableStrictModeCompat={true}>
          <CalendarEditor setOpen={setOpen} setCalendars={setCalendars} />
        </Fade>
      </Modal>
    </Container>
  );
}

export default Calendar;
