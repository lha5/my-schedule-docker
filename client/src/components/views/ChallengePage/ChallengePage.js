import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import swal from 'sweetalert';

import Challenging from './Challenging';
import Challenged from './Challenged';

import { getChallenging } from '../../../apis/challengeApi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  padding: 0 calc(23%);
  min-height: calc(100vh - 49px - 47px);

  @media only screen and (max-width: 1400px) {
    padding: 0 calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 0 calc(15%);
  }
`;

function ChallengePage({ user }) {
  const [Challenge, setChallenge] = useState([]);
  const [IsSaveChallenge, setIsSaveChallenge] = useState(false);
  const [HowManyDone, setHowManyDone] = useState(0);

  useEffect(() => {
    getChallenge();
  }, []);

  useEffect(() => {
    getChallenge();
    
    setIsSaveChallenge(false);
  }, [IsSaveChallenge]);

  const getChallenge = () => {
    getChallenging()
      .then(response => {
        if (response.data.data.length > 0) {
          setChallenge(response.data.data);
          setHowManyDone(response.data.data[0].done.filter(element => element === true).length);
        } else {
          setChallenge([]);
        }
      })
      .catch(error => {
        console.error('error occured in Challenging - getChallenge() ', error);

        swal({
          title: '챌린지를 가져올 수 없습니다.',
          text: '잠시 후 다시 시도해주세요'
        });
      });
  }

  return (
    <Container>
      <Challenging
        Challenge={Challenge}
        user={user}
        setIsSaveChallenge={setIsSaveChallenge}
        HowManyDone={HowManyDone}
        getChallenge={getChallenge}
      />
      <Challenged />
    </Container>
  );
}

export default ChallengePage;
