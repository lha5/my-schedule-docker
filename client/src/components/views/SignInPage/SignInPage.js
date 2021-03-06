import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import axios from 'axios';

import titleLogo from '../../../assets/images/title-logo.png'
import KakaoLogin from './KakaoLogin';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 calc(23%);
  justify-content: center;
  height: calc(100vh - 71px - 48px);

  div.kakao-login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: fit-content;

    div.title-container {
      align-items: center;
    }

    div.welcome {
      margin-bottom: 70px;
    }
  }

  @media only screen and (max-width: 1400px) {
    padding: 0 calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 0 calc(15%);
  }

  /* div.bottom-section {
    width: 100%;
    text-align: center;
    padding: 15px 0;
    margin: 0 auto;
    font-size: 12px;
    border-top: 1px solid ${props => props.theme.colors.lightGray};
    color: ${props => props.theme.colors.darkGray};
  } */
`;

function SignInPage() {
  const code = useRef();

  useEffect(() => {
    const thisUrlParameter = window.location.search;
    if (thisUrlParameter) {
      const codeArray = thisUrlParameter.split('=');

      if (codeArray[0].indexOf('code') !== -1) {
        code.current = codeArray[1];

        getKakaoToken();
      } else {
        window.location.replace('/');
      }
    }
  }, []);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const hostName = 'https://kauth.kakao.com/oauth/token';
  const grantType = 'grant_type=authorization_code';

  const getKakaoToken = () => {
    axios
      .post(
        `${hostName}?${grantType}&client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code.current}`,
        axiosConfig
      )
      .then((response) => {
        if (response.status === 200) {
          console.log('카카오 토큰 요청 성공');

          axios
            .post(
              `${process.env.REACT_APP_URI}${process.env.REACT_APP_USER_SERVER}/kakao/signin`,
              response.data
            )
            .then((response) => {
              if (response.status === 200) {
                // localStorage.setItem('user_id', response.data.user_id);
                localStorage.setItem('user_auth', response.data.user_auth);
                localStorage.setItem('k_', response.data.k_);

                window.location.replace('/');
              } else {
                window.location.replace('/');
              }
            });
        }
      })
      .catch((error) => {
        console.log(
          'Error occured in KakaoLoginProcess.js - getKakaoToken() ',
          error
        );
        window.location.replace('/');
      });
  }

  return (
    <Container>
      <div className="kakao-login-container">
        <div className="title-container">
          <img src={titleLogo} alt="마감을 사수하자" />
        </div>
        <div className="welcome">
          <i>당신의 마감을 도와드립니다.</i>
        </div>
        <KakaoLogin />
      </div>
      {/* <div className="bottom-section">
        LHA presents. © LHA ALL RIGHTS RESERVED SINCE 2021
      </div> */}
    </Container>
  );
}

export default withRouter(SignInPage);
