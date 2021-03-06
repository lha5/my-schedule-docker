const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  id: {
    type: Number
  },
  name: {
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
  }
}, { timestamps: true });

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = { Calendar };
