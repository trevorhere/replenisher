const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  name: { type: String },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  notes: { type: String },
  feedback: { type: String },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'task'
  }]
}, {usePushEach: true});

ListSchema.statics.createTask = function(
      content,
      listID,
      status,
      creatorID,
      rank,
      priority,
      started,
      finished,
      duration,
      notes
      ){
  console.log('status: ', status);
  console.log('started: ', started);

  const Task = mongoose.model('task');
    return this.findById(listID)
      .then(list => {
        const task = new Task({
          content,
          list,
          status,
          creatorID,
          rank,
          priority,
          started,
          finished,
          duration,
          notes })
        list.tasks.push(task)
        return Promise.all([task.save(), list.save()])
          .then(([task, list]) => list);
      });
}

ListSchema.statics.findTasks = function(id){
  return this.findById(id)
    .populate('tasks')
    .then(list => list.tasks);
}

mongoose.model('list', ListSchema);