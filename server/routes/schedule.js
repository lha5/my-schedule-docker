const express = require('express');
const router = express.Router();

const scheduleController = require('../controller/schedule');
const { auth } = require('../middleware/auth');

// -------------------------
//        Schedule
// -------------------------

router.get('/', auth, scheduleController.getMySchedule);

router.post('/', auth, scheduleController.createSchedule);

router.delete('/delete', auth, scheduleController.deleteSchedule);

router.patch('/update', auth, scheduleController.updateSchedule);

module.exports = router;
