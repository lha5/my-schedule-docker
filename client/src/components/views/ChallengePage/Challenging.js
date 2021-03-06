import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { AddOutlined, Delete, SentimentDissatisfiedOutlined as NotSmile } from '@material-ui/icons';
import swal from 'sweetalert';
import ReactTooltip from 'react-tooltip';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, TextField } from '@material-ui/core';
import moment from 'moment';

import { createChallenge, deleteChallenge } from './../../../apis/challengeApi';

const Container = styled.div`
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: 5px;
  margin-top: 50px;

  div.section-title {
    border-bottom: 1px solid ${props => props.theme.colors.darkGray};
    margin: 15px auto;
    padding: 0 20px 15px 20px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      background-color: ${props => props.theme.colors.white};
      border: 2px solid ${props => props.theme.colors.darkGray};

      svg, path {
        color: ${props => props.theme.colors.darkGray};
      }

      &:hover {
        background-color: ${props => props.theme.colors.darkGray};

        svg, path {
          color: ${props => props.theme.colors.white};
        }
      }
    }

    .del-btn {
      border: none;
    }
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
`;

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 600,
    height: 550,
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    outline: 'none',

    '& > div': {
      fontSize: '23px',
      fontWeight: 600,
    },

    '& form': {
      width: 600,
      margin: '0 auto',

      '& > div': {
        margin: '35px 50px',
      },

      '& > div:nth-child(2)': {
        display: 'flex',
        justifyContent: 'space-between',
      },

      '& > button': {
        width: 200,
        height: 'auto',
        padding: '20px 35px',
        fontSize: '16px',
        borderRadius: '5px',
        backgroundColor: '#000000',
        color: '#ffffff'
      }
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const ChallengeDoing = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 35px 0 50px 0;

  div.c-title {
    font-size: 32px;
    font-weight: 500;
  }

  div.c-due-date {
    font-size: 17px;
    color: ${props => props.theme.colors.gray};
  }
`;

function Challenging({ Challenge, user, setIsSaveChallenge, HowManyDone, getChallenge }) {
  const classes = useStyles();

  const [Open, setOpen] = useState(false);
  const [ChallengeInfo, setChallengeInfo] = useState({
    title: '',
    goal: 1,
    dueDate: moment().format('YYYY[-]MM[-]DDThh:mm'),
    memo: ''
  });

  const renderEmpty = () => {
    return (
      <div className="is-empty">
        <div className="icon-empty"><NotSmile fontSize="large" /></div>
        <div className="notice-empty">?????? ???????????? ???????????? ????????????.</div>
      </div>
    );
  }

  const handleDelete = () => {
    swal({
      title: '???????????? ?????????????????????????',
      icon: 'warning',
      buttons: ['??????', '??????']
    }).then(async value => {
      if (value) {
        deleteChallenge(Challenge[0]._id)
          .then(response => {
            getChallenge();
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const arr1 = Array.from({ length: ChallengeInfo.goal }, (v, i) => i);
    const arr2 = Array.from({ length: ChallengeInfo.goal }, (v, i) => false);

    const dataToSubmit = {
      writer: user && user.userData ? user.userData._id : '',
      title: ChallengeInfo.title,
      goal: arr1,
      done: arr2,
      dueDate: ChallengeInfo.dueDate,
      memo: ChallengeInfo.memo
    };

    await createChallenge(dataToSubmit)
      .then(response => {
        setIsSaveChallenge(true);
        setOpen(false);
      })
      .catch((error) => {
        console.error(
          'error occured in Challenging.js - createChallenge(dataToSubmit) ',
          error
        );

        swal({
          title: '????????? ???????????? ????????? ??? ????????????.',
          text: '?????? ??? ?????? ??????????????????',
        });
      });
  }

  const onChangeTitle = (event) => {
    setChallengeInfo({ ...ChallengeInfo, title: event.target.value });
  }

  const onChangeGoal = (event) => {
    setChallengeInfo({ ...ChallengeInfo, goal: event.target.value });
  }

  const onChangeDueDate = event => {
    setChallengeInfo({ ...ChallengeInfo, dueDate: event.target.value });
  }

  const onChangeMemo = event => {
    setChallengeInfo({ ...ChallengeInfo, memo: event.target.value });
  }

  const createChallengeBody = () => {
    return (
      <div className={classes.paper}>
        <div>????????? ???????????? ??????!!</div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div>
            <TextField
              type="text"
              onChange={onChangeTitle}
              label="????????? ??????"
              id="standard-basic"
              fullWidth
              required
            />
          </div>
          <div>
            <TextField
              type="number"
              onChange={onChangeGoal}
              label="????????? ?????? ??????"
              helperText="????????? 1??? ?????? 50????????? ???????????????."
              required
            />
            <TextField
              id="datetime-local"
              label="????????? ??????"
              type="datetime-local"
              value={ChallengeInfo.dueDate}
              onChange={onChangeDueDate}
              required
            />
          </div>
          <div>
            <TextField
              type="text"
              variant="outlined"
              onChange={onChangeMemo}
              label="??????"
              multiline
              rows="3"
              rowsMax="5"
              value={ChallengeInfo.memo}
              fullWidth
            />
          </div>
          <button type="submit">????????? ????????????</button>
        </form>
      </div>
    );
  }

  const renderChallenging = () => {
    return (
      <ChallengeDoing>
        <Link to={`/challenge/${Challenge[0]._id}`}>
          <div className="c-title">
            {Challenge[0].title} (
            {HowManyDone === 0 ? '0' : HowManyDone}/
            {Challenge[0].goal.length})
          </div>
          <div className="c-due-date">
            ~{' '}
            {moment(Challenge[0].dueDate).format(
              'YYYY[???] MM[???] DD[???] hh:mm'
            )}
          </div>
        </Link>
      </ChallengeDoing>
    );
  }

  return (
    <Container>
      <div className="section-title">
        <div className="challenging">?????? ?????? ?????????</div>
        {Challenge && Challenge.length > 0 ? (
          <button
            type="button"
            className="del-btn"
            data-tip="????????? ??????"
            data-effect="solid"
            data-place="left"
            onClick={handleDelete}
          >
            <Delete />
          </button>
        ) : (
          <button
            type="button"
            data-tip="????????? ?????????"
            data-effect="solid"
            data-place="left"
            onClick={handleOpen}
          >
            <AddOutlined />
          </button>
        )}
        <ReactTooltip />
      </div>
      {Challenge.length <= 0 ? renderEmpty() : renderChallenging()}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={Open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={Open} disableStrictModeCompat={true}>
          {createChallengeBody()}
        </Fade>
      </Modal>
    </Container>
  );
}

export default Challenging;
