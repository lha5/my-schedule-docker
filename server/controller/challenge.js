const { Challenge } = require('../models/Challenge');

exports.createChallenge = async (req, res, next) => {
  try {
    const data = req.body;

    const newChallenge = new Challenge(data);

    newChallenge.save((err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'fail to save new challenge', err });
      }
      
      res.status(200).json({ success: true });
    });
  } catch (error) {
    next(error);
  }
}

// 진행 중인 챌린지 가져오기
exports.getMyChallenging = async (req, res, next) => {
  try {
    const user = req.user._id;

    const myChallenge = await Challenge.find({ writer: user, isComplete: false });

    if (myChallenge.length > 0) {
      res.status(200).json({ success: true, data: myChallenge });
    } else {
      res.status(200).json({ success: true, data: [] });
    }
  } catch (error) {
    next(error);
  }
}

// 특정 챌린지 가져오기
exports.getMyChallenge = async (req, res, next) => {
  try {
    const challengeId = req.query.id;

    const myChallenge = await Challenge.find({ _id: challengeId });

    if (myChallenge) {
      res.status(200).json({ success: true, data: myChallenge });
    } else {
      res.status(200).json({ success: true, data: [] });
    }
  } catch (error) {
    next(error);
  }
}

exports.getMyAllChallenge = async (req, res, next) => {
  try {
    const user = req.user._id;

    const myChallenge = await Challenge.find({ writer: user, isComplete: true }).sort({ createdAt: -1 });

    if (myChallenge.length > 0) {
      res.status(200).json({ success: true, data: myChallenge });
    } else {
      res.status(200).json({ success: true, data: [] });
    }
  } catch (error) {
    next(error);
  }
}

exports.updateMyChallenging = async (req, res, next) => {
  try {
    const challengeId = req.query.id;
    const changeData = req.body;

    const myChallenge = await Challenge.findOneAndUpdate({ _id: challengeId }, changeData);

    if (myChallenge.length > 0) {
      res.status(200).json({ success: true, data: myChallenge });
    } else {
      res.status(200).json({ success: true, data: [] });
    }
  } catch (error) {
    next(error);
  }
}

exports.deleteMyChallenge = async (req, res, next) => {
  try {
    const challengeId = req.query.id;
    
    await Challenge.findOneAndDelete({ _id: challengeId }, (err, doc) => {
      if (err) {
        res.status(500).json({ success: false, err });
      }

      res.status(200).json({ success: true });
    });
  } catch (error) {
    next(error);
  }
}
