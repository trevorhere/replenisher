const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  name: { type: String },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'task'
  }]
}, {usePushEach: true});

ListSchema.statics.addTask = function(id, content ){
  const Task = mongoose.model('task');
    return this.findById(id)
      .then(list => {
        const task = new Task({ content, list })
        list.items.push(task)
        return Promise.all([task.save(), list.save()])
          .then(([task, list]) => list);
      });
}

ListSchema.statics.findTasks = function(id){
  return this.findById(id)
    .populate('items')
    .then(list => list.items);
}

mongoose.model('list', ListSchema);