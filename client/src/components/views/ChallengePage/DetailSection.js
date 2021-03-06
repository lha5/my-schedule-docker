import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import swal from 'sweetalert';
import moment from 'moment';

import { updateMyChallenge } from '../../../apis/challengeApi';

import AppleImage from '../../../assets/images/apple.png';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 calc(23%);
  height: calc(100vh - 49px - 47px);
  justify-content: center;
  align-items: center;

  div.render-box {
    display: flex;
    flex-direction: row;
    column-gap: 50px;
    justify-content: center;
    align-items: center;

    div.detail-info {
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      text-align: left;

      .info-title {
        font-size: 27px;
        font-weight: 500;
      }
    }

    div.apple-container {
      border-left: 1px solid ${props => props.theme.colors.black};
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      margin: 0 auto;

      .each-apple {
        cursor: pointer;
        border-right: 1px solid ${props => props.theme.colors.black};
        border-bottom: 1px solid ${props => props.theme.colors.black};
        padding: 20px;

        &:hover {
          background-color: ${props => props.theme.colors.primary};
        }

        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5) {
          border-top: 1px solid ${props => props.theme.colors.black};
        }
      }

      .done-apple {
        cursor: default;
        background-color: ${props => props.theme.colors.gray};

        img {
          opacity: 0.5;
        }
      }
    }
  }

  @media only screen and (max-width: 1400px) {
    padding: 20px calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 20px calc(15%);
  }

  @media ${props => props.theme.device.tablet} {
    flex-direction: column;
    height: auto;

    div.apple-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

function DetailSection({ challengeId, Challenge, HowManyDone, getChallenge }) {
  const handleCheckDone = (event) => {
    const targetId = event.target.id;
    let arr = [...Challenge.done];
    
    if (arr[targetId]) {
      return false;
    } else {
      arr[targetId] = true;
      const dataToSubmit = {
        done: arr
      };
  
      updateMyChallenge(challengeId, dataToSubmit)
        .then(response => {
          getChallenge();
        })
        .catch(error => {
          console.error('error occured in DetailChallenge - handleCheckDone() ', error);
  
          swal({
            title: '챌린지를 업데이트할 수 없습니다.',
            text: '잠시 후 다시 시도해주세요'
          });
        });
    }
  }

  const renderTable = () => (
    <div className="render-box">
      <div className="detail-info">
        <div className="info-title">{Challenge.title}</div>
        <div className="info-ing">
          {Challenge.goal.length}개 중에서 {HowManyDone}개 완료
        </div>
        <div className="info-duedate">
          {moment(Challenge.dueDate).format('YYYY[년] MM[월] DD[일] hh:mm')}{' '}
          까지!!
        </div>
        <div className="info-memo">{Challenge.memo}</div>
      </div>
      <div className="apple-container">
        {Challenge.goal.map((apple, index) => (
          <div
            onClick={handleCheckDone}
            className={
              Challenge.done[apple]
                ? 'each-apple done-apple'
                : 'each-apple not-yet'
            }
            key={index + Challenge.title}
          >
            <img src={AppleImage} alt="마감 사과" width="60px" id={apple} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderDone = () => (
    <div className="done-challenge">
      <div className="done-cong">챌린지가 종료되었습니다!</div>
      <div className="done-cong"><Link to="/challenge">챌린지 메인으로 이동하기</Link></div>
    </div>
  );

  return (
    <Container>
      {Challenge.isComplete ? renderDone() : renderTable()}
    </Container>
  );
}

export default DetailSection;
