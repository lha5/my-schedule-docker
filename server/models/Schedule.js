const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  id: {
    type: String
  },
  calendarId: {
    type: String
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  goingDuration: {
    type: Number
  },
  comingDuration: {
    type: Number
  },
  attendees: {
    type: Array
  },
  location: {
    type: String
  },
  isAllDay: {
    type: Boolean,
    default: false
  },
  isReadOnly: {
    type: Boolean,
    default: false
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  category: {
    type: String
  },
  color: {
    type: String
  },
  bgColor: {
    type: String
  },
  borderColor: {
    type: String
  },
  dragBgColor: {
    type: String
  },
  raw: {
    type: Object
  },
  state: {
    type: String
  }
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = { Schedule };
