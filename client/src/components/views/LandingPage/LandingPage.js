import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 calc(23%);
  height: calc(100vh - 49px - 47px);

  div.catch-phrase {
    font-size: 30px;
    font-weight: 600;

    &:nth-child(1) {
      margin-bottom: 15px;
    }
  }

  @media only screen and (max-width: 1400px) {
    padding: 0 calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 0 calc(15%);

    div.catch-phrase {
      font-size: 28px;
    }
  }

  @media ${props => props.theme.device.labtop} {
    div.catch-phrase {
      font-size: 23px;
    }
  }
`;

function LandingPage() {
  return (
    <Container>
      <div className="catch-phrase">이제는 마감에 쫒길 수 없다!</div>
      <div className="catch-phrase">지겨운 마감도 싫다!</div>
      <div className="desc-this">
        <p>Time Attack에서 이 문제를 해결해보세요.</p>
        <p>마감 챌린지와 스케쥴 관리로 마감이 더 이상 무섭지 않습니다.</p>
      </div>
    </Container>
  );
}

export default LandingPage;
