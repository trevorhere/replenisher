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
  priority: {type: Number},
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  dueDate: {type:String},
  timeDue: {type:String},
  started: {type: String},
  finished: {type: String},
  durationHours: { type: Number },
  durationMinutes: { type: Number }
});


TaskSchema.statics.changeTaskStatus = function(taskID, status, started, finished){
  return this.findById(taskID)
    .then(task => {
        task.status = status;
        task.started = started;
        task.finished = finished;
        return Promise.all(task.save())
        .then(task => task);
      })
}

mongoose.model('task', TaskSchema);