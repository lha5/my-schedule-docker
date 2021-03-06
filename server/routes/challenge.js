const express = require('express');
const router = express.Router();

const ChallengeContoller = require('../controller/challenge');
const { auth } = require('../middleware/auth');

// -------------------------
//        Calendar
// -------------------------

router.get('/challenging', auth, ChallengeContoller.getMyChallenging);

router.get('/detail', auth, ChallengeContoller.getMyChallenge);

router.get('/', auth, ChallengeContoller.getMyAllChallenge);

router.post('/', auth, ChallengeContoller.createChallenge);

router.patch('/', auth, ChallengeContoller.updateMyChallenging);

router.delete('/', auth, ChallengeContoller.deleteMyChallenge);

module.exports = router;