const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  content: { type: String },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'list'
  },
  status: { type: String },
  rank: { type: String },
  notes: { type: String },
  feedback: { type: String },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  started: {type: Date},
  finished: {type: Date},
  recurring: {type: Boolean},
  recurringSequence: { type: String },
  duration: { type: Number }
});

mongoose.model('task', TaskSchema);