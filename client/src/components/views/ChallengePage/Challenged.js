import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/ko';
import ReactTooltip from 'react-tooltip';
import {
  SentimentDissatisfiedOutlined as NotSmile,
  MessageOutlined,
  Delete,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox
} from '@material-ui/core';

import { getAllMyChallenge, deleteChallenge } from './../../../apis/challengeApi';

const Container = styled.div`
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 5px;
  margin-top: 25px;

  div.section-title {
    border-bottom: 1px solid ${props => props.theme.colors.gray};
    margin: 15px auto;
    padding: 8px 20px 23px 20px;
    text-align: left;
  }

  div.is-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 25px auto;

    .notice-empty {
      font-size: 18px;
      color: ${props => props.theme.colors.darkGray};
      margin: 25px auto;
    }
  }

  div.table-box {
    margin: 25px;

    thead > tr {
      border-bottom: 2px solid ${props => props.theme.colors.darkGray};
      
      th {
        font-size: 15px;
        font-weight: 600;
      }
    }

    tbody > tr:hover {
      cursor: pointer;
    }

    .delete-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px auto 10px auto;
      width: fit-content;

      &:hover {
        cursor: pointer;
        color: ${props => props.theme.colors.danger};

        svg path {
          color: ${props => props.theme.colors.danger};
        }
      }
    }
  }
`;

const useStyles = makeStyles({
  title: {
    width: '35%'
  }
});

function Challenged() {
  const [All, setAll] = useState([]);
  const [Selected, setSelected] = useState([]);
  
  const classes = useStyles();

  useEffect(() => {
    getAllChallenge();
  }, []);

  const getAllChallenge = () => {
    getAllMyChallenge()
      .then(response => {
        setAll(response.data.data);
      })
      .catch(error => {
        console.error('error occured in Challenging - getChallenge() ', error);

        swal({
          title: '???????????? ????????? ??? ????????????.',
          text: '?????? ??? ?????? ??????????????????'
        });
      });
  }

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allSelected = All.map((v) => v._id);
      setSelected(allSelected);

      return;
    }
    setSelected([]);
  }

  const handleSelect = (value) => {
    const currentIndex = Selected.indexOf(value);

    const newSelected = [...Selected];

    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  }

  const handleDelete = () => {
    swal({
      title: '???????????? ?????????????????????????',
      icon: 'warning',
      buttons: ['??????', '??????']
    }).then(async value => {
      if (value) {
        const promises = Selected.map(deleteChallenge);

        await Promise
          .all(promises)
          .then(response => {
            setSelected([]);
            getAllChallenge();
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

  const renderEmpty = () => {
    return (
      <div className="is-empty">
        <div className="icon-empty"><NotSmile fontSize="large" /></div>
        <div className="notice-empty">?????? ???????????? ????????????.</div>
      </div>
    );
  }

  const renderDoYouDelete = () => {
    return (
      <div className="delete-container" onClick={handleDelete}>
        ????????? {Selected.length}??? ????????? ?????? <Delete />
      </div>
    );
  }

  const renderList = () => {
    return (
      <div className="table-box">
        <TableContainer>
          <Table arial-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={All.length === Selected.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell className={classes.title}>????????? ??????</TableCell>
                <TableCell align="center">?????? ?????? ??????</TableCell>
                <TableCell align="center">????????? ?????? ??????</TableCell>
                <TableCell align="center">???????????? ?????? ??????</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {All &&
                All.map((row, index) => (
                  <TableRow key={index + row.title} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={Selected.indexOf(row._id) !== -1}
                        onChange={() => handleSelect(row._id)}
                      />
                    </TableCell>
                    <TableCell className={classes.title}>
                      {row.title}&nbsp;
                      {row.memo && <MessageOutlined data-tip={row.memo} data-effect="solid" fontSize="small" />}
                      <ReactTooltip />
                    </TableCell>
                    <TableCell align="center">{row.goal.length}</TableCell>
                    <TableCell align="center">
                      {moment(row.dueDate).format('YYYY[???] MM[???] DD[???] LT')}
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.updatedAt).format(
                        'YYYY[???] MM[???] DD[???] LT'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {Selected.length > 0 && renderDoYouDelete()}
      </div>
    );
  }

  return (
    <Container>
      <div className="section-title">
        <div className="challenging">?????? ?????????</div>
      </div>
      {All.length > 0 ? renderList() : renderEmpty()}
    </Container>
  );
}

export default Challenged;
