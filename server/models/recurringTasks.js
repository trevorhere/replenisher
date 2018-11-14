const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecurringTasksSchema = new Schema({
  content: { type: String },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'task'
  }],
  list: {
    type: Schema.Types.ObjectId,
    ref: 'list'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
});


// TaskSchema.statics.changeTaskStatus = function(taskID, status, started, finished){
//   return this.findById(taskID)
//     .then(task => {
//         task.status = status;
//         task.started = started;
//         task.finished = finished;
//         return Promise.all(task.save())
//         .then(task => task);
//       })
// }

mongoose.model('recurringTasks', RecurringTasksSchema);