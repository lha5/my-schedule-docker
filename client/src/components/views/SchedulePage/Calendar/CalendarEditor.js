import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { CirclePicker } from 'react-color';
import swal from 'sweetalert';
import { DeleteOutlined } from '@material-ui/icons';

import { getLastId, createCalendarTheme, getCalendarTheme, deleteCalendarTheme } from '../../../../apis/calendarApi';

const Container = styled.div`
  width: 600px;
  height: 550px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 5px;
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  justify-content: space-between;

  div.delete-list,
  div.form-section  {
    margin: 5px 12px;
  }

  div.delete-list {
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${props => props.theme.colors.gray};
    height: auto;
    justify-content: start;
  }

  div.form-section {
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 25px;
      margin-top: 20px;

      input[type="text"] {
        width: 250px;
        padding: 0.5em;
        border: none;
        background-color: ${props => props.theme.colors.white};
        border-bottom: 1px solid ${props => props.theme.colors.darkGray};
      }

      button {
        background-color: ${props => props.theme.colors.white};
        border: 1px solid ${props => props.theme.colors.darkGray};
        border-radius: 5px;
        padding: 0.8em 1em;
        color: ${props => props.theme.colors.darkGray};
      }

      .how-to {
        font-size: 16px;
        font-weight: 500;
        margin: 20px auto 0 auto;
        width: 100%;
        text-align: left;
        display:flex;
        flex-direction: row;
        align-items: center;
        
        .gesture {
          font-size: 22px;
          margin-right: 10px;
        }
      }
    }
  }
`;

const MyTheme = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 10px 5px 10px;

  div.theme-container {
    display: flex;
    flex-direction: row;
    width: 100%;

    div.color-palette {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin: 0;
      background-color: ${(props) => props.coloring};
    }
  
    div.theme-name {
      margin: 0 0 0 7px;
      font-size: 14px;
      width: fit-content;
    }
  }

  div:last-child {
    display: flex;
    align-items: center;

    svg,
    path {
      font-size: 20px;
      color: ${props => props.theme.colors.gray};

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const TryAddYours = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .gesture {
    font-size: 36px;
    margin: 10px auto;
  }
`;

function CalendarEditor({ setCalendars }) {
  const user = useSelector(state => state.user);

  const [Name, setName] = useState('');
  const [Background, setBackground] = useState('');
  const [CalTheme, setCalTheme] = useState([]);

  useEffect(() => {
    getTheme();
  }, [CalTheme]);

  const getTheme = () => {
    getCalendarTheme()
      .then(response => {
        setCalTheme(response.data.data);
        setCalendars(CalTheme);
      })
      .catch(error => {
        console.error('error occured in MyCalendarTheme.js - getCalendarTheme() ', error);

        swal({
          title: '?????? ?????? ????????? ????????? ??? ????????????.',
          icon: 'error'
        });
      });
  }

  const handleName = (event) => {
    setName(event.target.value);
  }

  const handleChangeColor = (color, event) => {
    setBackground(color.hex);
  }

  const createTheme = async (event) => {
    event.preventDefault();

    if (Name === '' || Background === '') {
      swal({
        title: '?????? ????????? ???????????????.',
        icon: 'warning'
      });

      return false;
    }

    let lastId = 0;

    getLastId()
      .then(response => {
        lastId += response.data.data;

        const dataToSubmit = {
          writer: user && user.userData ? user.userData._id : '',
          id: lastId,
          name: Name,
          color: '#ffffff',
          bgColor: Background,
          dragBgColor: Background,
          borderColor: Background,
        };
    
        createCalendarTheme(dataToSubmit)
          .then(response => {
            setName('');
            setBackground('');
            getTheme();
          })
          .catch(error => {
            console.error('error occured in CalendarEditor.js - createCalendarTheme() ', error);

            swal({
              title: '?????? ?????? ????????? ????????? ??? ????????????.',
              text: '?????? ??? ?????? ??????????????????'
            });
          });
      })
      .catch(error => {
        console.error('error occured in CalendarEditor.js - getLastId() ', error);

        swal({
          title: '?????? ?????? ?????? ????????? ????????? ??? ????????????.',
          text: '?????? ??? ?????? ??????????????????'
        });
      });
  }

  const handleDelete = (event) => {
    const target = event.target.id;

    swal({
      title: '?????? ????????? ?????????????????????????',
      icon: 'warning',
      buttons: ['??????', '??????']
    }).then(value => {
      if (value) {
        deleteCalendarTheme(target)
          .then(response => {
            getTheme();
          })
          .catch(error => {
            console.error('error occured in CalendarEditor.js - handleDelete(event) ', error);

            swal({
              title: '?????? ????????? ????????? ??? ????????????.',
              icon: 'error'
            });
          });
      } else {
        return false;
      }
    });
  }

  const renderList = CalTheme.map((theme, index) => (
    <MyTheme coloring={theme.bgColor} key={theme.id + theme.name}>
      <div className="theme-container">
        <div className="color-palette" />
        <div id={theme.id} className="theme-name">{theme.name}</div>
      </div>
      {theme.id !== 0 && <div onClick={handleDelete}><DeleteOutlined id={theme.id} /></div>}
    </MyTheme>
  ));

  const renderNotice = () => {
    return (
      <TryAddYours>
        <div className="gesture">????</div>
        <div className="notice">
          ???????????????<br/> ?????? ?????????<br/> ???????????????!
        </div>
      </TryAddYours>
    );
  }

  return (
    <Container>
      <div className="delete-list">{CalTheme.length > 0 ? renderList : renderNotice()}</div>
      <div className="form-section">
        <form onSubmit={createTheme}>
          <div className="how-to"><span className="gesture">??????</span> ????????? ????????? ????????? ???????????????.</div>
          <input
            type="text"
            name="name"
            placeholder="?????? ??????. ???: ?????????"
            onChange={handleName}
            defaultValue={Name}
          />
          <div className="how-to"><span className="gesture">??????</span> ????????? ????????? ????????? ???????????????.</div>
          <CirclePicker color={Background} onChange={handleChangeColor} />
          <div className="how-to"><span className="gesture">????</span> ???????????? ????????? ????????? ???!</div>
          <button type="submit">?????? ?????? ????????????</button>
        </form>
      </div>
    </Container>
  );
}

export default CalendarEditor;
