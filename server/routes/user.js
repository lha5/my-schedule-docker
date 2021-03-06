const express = require('express');
const router = express.Router();

const userController = require('../controller/user');
const { auth } = require('../middleware/auth');

// -------------------------
//           User
// -------------------------

router.get('/auth', auth, userController.auth);

router.post('/kakao/signin', userController.kakaoSigninUser);

router.post('/kakao/logout', auth, userController.kakaoLogoutUser);

router.patch('/update', auth, userController.editMyName);

module.exports = router;
