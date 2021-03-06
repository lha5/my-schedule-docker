const { Schedule } = require('../models/Schedule');

exports.getMySchedule = async (req, res, next) => {
  try {
    const user = req.user._id;

    const mySchedule = await Schedule.find({ writer: user });

    res.status(200).json({ success: true, data: mySchedule });
  } catch (error) {
    next(error);
  }
}

exports.createSchedule = async (req, res, next) => {
  try {
    const data = req.body;

    const newSchedule = new Schedule(data);

    newSchedule.save((err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'fail to save new schedule', err });
      }
      
      res.status(200).json({ success: true });
    });
  } catch (error) {
    next(error);
  }
}

exports.deleteSchedule = async (req, res, next) => {
  try {
    const user = req.user._id;
    const scheduleId = req.query.id;

    await Schedule.findOneAndDelete({ writer: user, id: scheduleId }, (err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: '일정을 삭제하지 못했습니다.' });
      }
      
      res.status(200).json({ success: true });
    });
  } catch (error) {
    next(error);
  }
}

exports.updateSchedule = async (req, res, next) => {
  try {
    const user = req.user._id;

    const scheduleId = req.query.id;
    const dataToUpdate = req.body;

    await Schedule.findOneAndUpdate({ writer: user, id: scheduleId }, dataToUpdate, (err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: '일정을 수정하지 못했습니다.' });
      }

      res.status(200).json({ success: true });
    });
  } catch (error) {
    next(error);
  }
}
