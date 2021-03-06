const express = require('express');
const router = express.Router();

const CalendarController = require('../controller/calendar');
const { auth } = require('../middleware/auth');

// -------------------------
//        Calendar
// -------------------------

router.get('/', auth, CalendarController.getMyCalendarTheme);

router.get('/last-no', auth, CalendarController.getLastCalendarId);

router.post('/', auth, CalendarController.createMyCalendarTheme);

router.delete('/delete', auth, CalendarController.deleteCalendarTheme);

router.patch('/update', auth, CalendarController.updateCalendarTheme);

module.exports = router;