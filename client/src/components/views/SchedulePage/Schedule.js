import React, { useCallback, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';

import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import swal from 'sweetalert';

import {
  getMySchedule,
  createScehdule,
  deleteSchedule,
  updateSchedule,
} from './../../../apis/scheduleApi';

import { getCalendarTheme } from './../../../apis/calendarApi';

const Container = styled.div`
  div#menu {
    padding: 15px 10px;
    display: grid;
    grid-template-columns: 0.25fr auto 0.25fr;

    div.render-range-mobile {
      display: none;
    }

    div.menu-navi {
      display: flex;
      flex-direction: row;
      column-gap: 5px;

      button.btn.move-today {
        border: 1px solid #bbbbbb;
        border-radius: 20px;
        background-color: #ffffff;
        text-align: center;
        padding: 4px 12px 6px 12px;
        margin-right: 10px;
      }

      button.btn.move-day {
        border: 1px solid #bbbbbb;
        border-radius: 50%;
        background-color: #ffffff;
        text-align: center;
        padding: 6px 8px;

        svg {
          font-size: 12px;
        }
      }

      .btn.move-day:hover,
      .btn.move-today:hover {
        border: 1px solid #393e46;
        background-color: #ffffff;
      }

      .btn.move-day:active,
      .btn.move-today:active {
        border: 1px solid #393e46;
        outline: none;
      }

      .btn.move-day:disabled,
      .btn.move-today:disabled {
        background-color: #bbbbbb;
        border: 1px solid #393e46;
        color: #393e46;
      }

      .btn:focus:active,
      .btn:focus,
      .btn:active {
        outline: none;
      }
    }

    div.render-range {
      font-size: 21px;
      vertical-align: middle;
      font-weight: 500;
    }

    div.select-box {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      select {
        border: 1px solid #bbbbbb;
        border-radius: 5px;
        padding: 3px 7px;
      }
    }
  }

  div.calendar-container {
    border: 1px solid #e5e5e5;
    border-top: none;

    div.calendar-container > div {
      height: 800px !important;
    }

    .tui-full-calendar-month {
      min-height: initial;
    }

    .tui-full-calendar-weekday-grid-line:hover {
      cursor: pointer;
    }

    .tui-full-calendar-section-allday {
      padding-left: 19px;
    }

    .tui-full-calendar-confirm {
      background-color: ${(props) => props.theme.colors.primary};
    }

    .tui-full-calendar-weekday-grid-date.tui-full-calendar-weekday-grid-date-decorator {
      background-color: ${(props) => props.theme.colors.primary};
    }

    .tui-full-calendar-extra-date .tui-full-calendar-weekday-grid-date {
      color: ${(props) => props.theme.colors.gray};
    }
  }

  @media only screen and (max-width: 1400px) {
    div.calendar-container > div {
      height: 700px !important;
    }

    div.calendar-container
      > div
      > div
      > div.tui-full-calendar-month.tui-full-calendar-vlayout-container
      > div:nth-child(2) {
      height: calc(100% - 31px) !important;
    }
  }

  @media ${(props) => props.theme.device.labtop} {
    div.calendar-container > div {
      height: 600px !important;
    }
  }

  @media ${(props) => props.theme.device.tablet} {
    div.calendar-container > div {
      height: 390px !important;
    }
  }

  @media only screen and (max-width: 600px) {
    div#menu {
      grid-template-columns: none;
      grid-template-areas:
        "top-area top-area"
        "a b";

      div.render-range-mobile {
        display: flex;
        grid-area: top-area;
        justify-content: center;
        padding: 0 0 10px 0;
        font-size: 21px;
        font-weight: 500;
      }

      div.menu-navi {
        grid-area: a;
        button.btn.move-today {
          margin-right: 0;
        }
      }

      div.render-range {
        display: none;
      }

      div.select-box {
        grid-area: b;
      }
    }
  }
`;

function Schedule({ user, Calendars, setCalendars, Schedule, setSchedule, getSchedule }) {
  const [View, setView] = useState('month');
  const [ViewModeOptions, setViewModeOptions] = useState([
    {
      title: '먼슬리',
      value: 'month'
    },
    {
      title: '위클리',
      value: 'week'
    }
  ]);
  const [DateRange, setDateRange] = useState('');

  const cal = useRef();

  useEffect(() => {
    setRenderRangeText();
  }, []);

  useEffect(() => {
    setRenderRangeText();
  }, [View]);
 
  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    const writer = user && user.userData ? user.userData._id : '';

    const mySchedule = {
      writer: writer,
      id: Math.floor(Math.random() * 101) + scheduleData.title,
      calendarId: scheduleData.calendarId,
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start._date,
      end: scheduleData.end._date,
      category: scheduleData.isAllDay ? 'allday' : 'time',
      dueDateClass: '',
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw['class'],
      },
      state: scheduleData.state,
      attendees: scheduleData.attendees,
      bgColor: scheduleData.bgColor,
      body: scheduleData.body,
      borderColor: scheduleData.borderColor,
      color: scheduleData.color,
      dragBgColor: scheduleData.dragBgColor
    };
    
    createScehdule(mySchedule)
      .then(response => {
        delete mySchedule.writer;

        cal.current.calendarInst.createSchedules([mySchedule]);
        
        getSchedule();
      })
      .catch(error => {
        console.error('error occured in SchedulePage.js - createScehdule(dataToSubmit) ', error);

        swal({
          title: '일정을 등록할 수 없습니다.',
          text: '잠시 후 다시 시도해주세요'
        });
      });
  }, []);

  const onBeforeDeleteSchedule = useCallback((res) => {
    const { id, calendarId } = res.schedule;

    swal({
      title: '일정을 삭제하시겠습니까?',
      icon: 'warning',
      buttons: [ '취소', '확인' ]
    }).then(value => {
      if (value) {
        deleteSchedule(id)
          .then(response => {
            cal.current.calendarInst.deleteSchedule(id, calendarId);

            getSchedule();
          })
          .catch(error => {
            console.error('error occured in SchedulePage.js - deleteSchedule(id) ', error);
    
            swal({
              title: '일정을 삭제할 수 없습니다.',
              text: '잠시 후 다시 시도해주세요'
            });
          });
      } else {
        return false;
      }
    });
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    const { schedule, changes } = e;

    if (changes.end || changes.start) {
      changes.end = changes.end._date;
      changes.start = changes.start._date;
    }

    updateSchedule(schedule.id, changes)
      .then((response) => {
        cal.current.calendarInst.updateSchedule(
          schedule.id,
          schedule.calendarId,
          changes
        );

        getSchedule();
      })
      .catch((error) => {
        console.error(
          'error occured in SchedulePage.js - updateSchedule(id, dataToSubmit) ',
          error
        );

        swal({
          title: '일정을 수정할 수 없습니다.',
          text: '잠시 후 다시 시도해주세요',
        });
      });
  }, []);

  const _getFormattedTime = (time) => {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  const _getTimeTemplate = (schedule, isAllDay) => {
    var html = [];

    if (!isAllDay) {
      html.push('<strong>' + _getFormattedTime(schedule.start) + '</strong> ');
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(' Private');
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(' ' + schedule.title);
    }

    return html.join('');
  }

  const templates = {
    time: function (schedule) {
      return _getTimeTemplate(schedule, false);
    },
    popupSave: function() {
      return '저장';
    },
    popupUpdate: function() {
      return '업데이트';
    },
    milestone(schedule) {
      return `<span style="color:#fff;background-color: ${schedule.bgColor};">${
        schedule.title
      }</span>`;
    },
    milestoneTitle() {
      return 'Milestone';
    },
    allday(schedule) {
      return `${schedule.title}<i class="fa fa-refresh"></i>`;
    },
    alldayTitle() {
      return '종일';
    }
  };

  const setRenderRangeText = () => {
    const view = cal.current.calendarInst.getViewName();
    const calDate = cal.current.calendarInst.getDate();
    const rangeStart = cal.current.calendarInst.getDateRangeStart();
    const rangeEnd = cal.current.calendarInst.getDateRangeEnd();

    let year = calDate.getFullYear();
    let month = calDate.getMonth() + 1;
    let date = calDate.getDate();
    let dateRangeText = '';
    let endMonth, endDate, start, end;

    switch (view) {
      case 'month':
        dateRangeText = `${year}년 ${month}월`;
        break;
      case 'week':
        year = rangeStart.getFullYear();
        month = rangeStart.getMonth() + 1;
        date = rangeStart.getDate();
        endMonth = rangeEnd.getMonth() + 1;
        endDate = rangeEnd.getDate();

        start = `${year}년 ${month < 10 ? '0' : ''}${month}월 ${
          date < 10 ? '0' : ''
        }${date}일`;
        end = `${year}년 ${endMonth < 10 ? '0' : ''}${endMonth}월 ${
          endDate < 10 ? '0' : ''
        }${endDate}일`;
        dateRangeText = `${start} - ${end}`;
        break;
      default:
        dateRangeText = `${year}년 ${month}월 ${date}일`;
    }

    setDateRange(dateRangeText);
  }

  const onClickNavi = (event) => {
    if (event.target.tagName === 'BUTTON') {
      const { target } = event;

      let action = target.dataset ? target.dataset.action : target.getAttribute('data-action');
      action = action.replace('move-', '');

      cal.current.calendarInst[action]();
      setRenderRangeText();
    }
  }

  const onChangeSelect = (event) => {
    setView(event.target.value);
    
    setRenderRangeText();
  }

  return (
    <Container>
      <div id="menu">
        <div className="render-range-mobile">{DateRange}</div>
        <div className="menu-navi">
          <button
            type="button"
            className="btn btn-default btn-sm move-today"
            data-action="move-today"
            onClick={onClickNavi}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm move-day"
            data-action="move-prev"
            onClick={onClickNavi}
          >
            <ArrowBackIosOutlined />
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm move-day"
            data-action="move-next"
            onClick={onClickNavi}
          >
            <ArrowForwardIosOutlined />
          </button>
        </div>
        <div className="render-range">{DateRange}</div>
        <div className="select-box">
          <select onChange={onChangeSelect} value={View}>
            {ViewModeOptions.map((option, index) => (
              <option value={option.value} key={index + option.value}>
                {option.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="calendar-container">
        <Calendar
          ref={cal}
          view={View}
          useCreationPopup={true}
          useDetailPopup={true}
          template={templates}
          calendars={Calendars}
          schedules={Schedule}
          disableDblClick={true}
          disableClick={false}
          onBeforeCreateSchedule={onBeforeCreateSchedule}
          onBeforeDeleteSchedule={onBeforeDeleteSchedule}
          onBeforeUpdateSchedule={onBeforeUpdateSchedule}
          usageStatistics={false}
          scheduleView={['time']}
          taskView
        />
      </div>
    </Container>
  );
}

export default Schedule;
