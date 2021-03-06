const axios = require('axios');
const { User } = require('../models/User');

exports.auth = async (req, res, next) => {
  try {
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      isAuth: true,
      isAdmin: req.user.role === 0 ? false : true,
      email: req.user.email
    });
  } catch (error) {
    next(error);
  }
}

exports.kakaoSigninUser = async (req, res, next) => {
  const kakaoToken = req.body;

  let profile;

  const getConfig = {
    headers: {
      Authorization: `Bearer ${kakaoToken.access_token}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  };

  if (kakaoToken) {
    await axios.get(`https://kapi.kakao.com/v2/user/me`, getConfig)
      .then(response => {
        if (response.status === 200) {
          profile = response.data;
        } else {
          return res.status(500).json({ success: false, message: '사용자 정보 가져오기 실패' });
        }
      })
      .catch(error => {
        console.log('프로필 요청 에러 ---------------------------');
        if (error.response) {
          console.error(
            '요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.',
          );
          console.error('error status::  ', error.response.status);
          // console.error('error headers:: ', error.response.headers);
          console.error('error data::    ', error.response.data);
        } else if (error.request) {
          console.error('요청이 이루어 졌으나 응답을 받지 못했습니다.');
          console.error('error::  ', error.request);
        } else {
          console.error(
            '오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.',
          );
          console.error('error:: ', error.message);
        }
        console.error(error.config);
        return res.status(500).json({ success: false });
      });
  }

  try {
    const user = await User.findOne({ provider: 1, providerId: profile.id });

    if (user) {
      user.generateToken((err, one) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'fail to generate token', err });
        }

        res
          .status(200)
          .json({
            user_id: one._id,
            user_auth: one.token,
            k_ : kakaoToken.access_token
          });
      });
    } else {
      const newUser = new User({
        name: profile.kakao_account.profile.nickname,
        email: profile.kakao_account.email || '',
        provider: 1,
        providerId: profile.id,
        connectedAt: profile.connected_at
      });

      newUser.save((err, doc) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'fail to save new user info', err });
        }

        newUser.generateToken((err, one) => {
          if (err) {
            return res.status(500).json({ success: false, message: 'fail to generate token', err });
          }

          res
            .status(200)
            .json({
              user_id: one._id,
              user_auth: one.token,
              k_ : kakaoToken.access_token
            });
        });
      });
    }
  } catch (error) {
    next(error);
  }
}

exports.kakaoLogoutUser = async (req, res, next) => {
  const logoutUrl = 'https://kapi.kakao.com/v1/user/logout';

  let logoutHeader = req.body.kakao_token;

  axios
    .post(logoutUrl, null, { headers: { Authorization: `Bearer ${logoutHeader}` } })
    .then(response => {
      console.log('카카오 로그인 로그아웃 응답 상태:: ', response.status);
      console.log('카카오 로그인 로그아웃 응답 값:: ', response.data);
    })
    .catch(error => {
      console.log('카카오 로그인 로그아웃 실패');
      if (error.response) {
        console.error(
          '요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.',
          );
          console.error('error status::  ', error.response.status);
          // console.error('error headers:: ', error.response.headers);
          console.error('error data::    ', error.response.data);
        } else if (error.request) {
          console.error('요청이 이루어 졌으나 응답을 받지 못했습니다.');
          console.error('error::  ', error.request);
        } else {
          console.error(
            '오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.',
          );
          console.error('error:: ', error.message);
        }
        console.error(error.config);
        return res.status(500).json({ result: false, message: '카카오 로그인 로그아웃 실패' });
    });

  try {
    let loggedoutUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '', tokenExp: 0 },
      { success: true }
    );

    if (loggedoutUser) {
      res.status(200).json(loggedoutUser);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
}

exports.editMyName = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const userName = req.body;

    User.findOneAndUpdate(
      { _id: userId },
      { name: userName.name },
      { rawResult: true },
      (err, doc) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'fail to update user name', err });
        }

        res.status(200).json({ success: true });
      }
    );
  } catch (error) {
    next(error);
  }
}
