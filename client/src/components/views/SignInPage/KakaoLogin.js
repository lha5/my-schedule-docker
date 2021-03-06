import React from 'react';

import kakaoLoginButton from '../../../assets/images/kakao_login.png';

function KakaoLogin() {
  const host = 'https://kauth.kakao.com/oauth/authorize?response_type=code';

  return (
    <div>
      <a href={`${host}&client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`}>
        <img alt="카카오 로그인" src={kakaoLoginButton} />
      </a>
    </div>
  );
}

export default KakaoLogin;
