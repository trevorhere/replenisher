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
  priority: {type: String},
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  started: {type: String},
  finished: {type: String},
  duration: { type: String }
});


TaskSchema.statics.taskCompleted = function(taskID){
  return this.findById(taskID)
    .then(task => {
        task.status = "complete";
        return Promise.all(task.save())
        .then(task => task);
      })
}

mongoose.model('task', TaskSchema);