const { Calendar } = require('../models/Calendar');

exports.getMyCalendarTheme = async (req, res, next) => {
  try {
    const user = req.user._id;

    const myCalendarTheme = await Calendar.find({ writer: user });

    if (myCalendarTheme.length > 0) {
      res.status(200).json({ success: true, data: myCalendarTheme });
    } else {
      const commonTheme = await Calendar.find({ id: 0 });

      return res.status(200).json({ success: true, data: commonTheme });
    }
  } catch (error) {
    next(error);
  }
}

exports.getLastCalendarId = async (req, res, next) => {
  try {
    const user = req.user._id;

    Calendar.find({ writer: user }, { _id: false, id: true }, { sort: { id: -1 }, limit: 1 }, (err, calendar) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'fail to get last id', err });
      }

      if (calendar.length <= 0) {
        res.status(200).json({ success: true, data: 1 });
      } else {
        res.status(200).json({ success: true, data: parseInt(calendar[0].id)+ 1 });
      }
    })
  } catch (error) {
    next(error);
  }
}

exports.createMyCalendarTheme = async (req, res, next) => {
  try {
    const data = req.body;

    const calendarTheme = new Calendar(data);

    calendarTheme.save((err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'fail to save new calendar', err });
      }
      
      res.status(200).json({ success: true });
    });
  } catch (error) {
    next(error);
  }
}

exports.deleteCalendarTheme = async (req, res, next) => {
  try {
    const user = req.user._id;

    const id = req.query.id;

    Calendar.findOneAndDelete({ writer: user, id: id }, (err, doc) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'fail to delete calendar', err });
      }
      
      res.status(200).json({ success: true });
    });
  } catch (error) {
    next(error);
  }
}

exports.updateCalendarTheme = async (req, res, next) => {
  try {
    const user = req.user._id;

    const id = req.query.id;
  } catch (error) {
    next(error);
  }
}
