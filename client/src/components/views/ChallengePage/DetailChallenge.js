import React, { useEffect, useState } from 'react';

import swal from 'sweetalert';

import { getMyChallenge, updateMyChallenge } from '../../../apis/challengeApi';

import DetailSection from './DetailSection';

function DetailChallenge({ match, history }) {
  const challengeId = match.params.id || '';

  const [Challenge, setChallenge] = useState({});
  const [HowManyDone, setHowManyDone] = useState(0);

  useEffect(() => {
    getChallenge();
  }, []);

  const getChallenge = () => {
    getMyChallenge(challengeId)
      .then((response) => {
        setChallenge(response.data.data[0]);

        const trueCount = response.data.data[0].done.filter((element) => element === true).length;
        setHowManyDone(trueCount);

        if (trueCount === response.data.data[0].goal.length) {
          allDoneMyChallenge();
        }
      })
      .catch((error) => {
        console.error(
          'error occured in DetailChallenge - getChallenge() ',
          error
        );

        swal({
          title: '챌린지를 가져올 수 없습니다.',
          text: '잠시 후 다시 시도해주세요',
        });
      });
  };

  const allDoneMyChallenge = () => {
    const dataToSubmit = {
      isComplete: true
    };

    updateMyChallenge(challengeId, dataToSubmit)
      .then(response => {
        swal({
          title: '축하합니다!!',
          text: '해당 챌린지를 완료하였습니다.',
          icon: 'success'
        }).then(value => {
          if (value) {
            history.push('/challenge');
          }
        });
      })
      .catch((error) => {
        console.error(
          'error occured in DetailChallenge - allDoneMyChallenge() ',
          error
        );

        swal({
          title: '챌린지를 업데이트할 수 없습니다.',
          text: '잠시 후 다시 시도해주세요',
        });
      });
  }

  return (
    Object.keys(Challenge).length > 0 && (
      <DetailSection
        Challenge={Challenge}
        HowManyDone={HowManyDone}
        getChallenge={getChallenge}
        challengeId={challengeId}
      />
    )
  );
}

export default DetailChallenge;
