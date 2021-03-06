const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String
  },
  memo: {
    type: String
  },
  goal: {
    type: Array
  },
  done: {
    type: Array
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date
  }
}, { timestamps: true });

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = { Challenge };
