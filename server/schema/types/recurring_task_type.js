const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = graphql;

const Task = mongoose.model('task');
const TaskType = require('./task_type');

const RecurringTasksType = new GraphQLObjectType({
  name:  'RecurringTasksType',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    tasks: {
      type: GraphQLList(TaskType),
      resolve(parentValue) {
        return RecurringTasks.findById(parentValue).populate('recurringTasks')
        .then(recurringTasks => {
          return recurringTasks.tasks;
        })
      }
    },
    creator: {
      type: require('./user_type'),
      resolve(parentValue){
        return RecurringTasks.findById(parentValue).populate('creator')
          .then(recurringTasks => {
            return recurringTasks.creator;
          });
      }
    },
     owner: {
      type: require('./user_type'),
      resolve(parentValue){
        return RecurringTasks.findById(parentValue).populate('owner')
          .then(recurringTasks => {
            return recurringTasks.owner;
          });
      }
    },
    list: {
      type: require('./list_type'),
      resolve(parentValue) {
        return RecurringTasks.findById(parentValue).populate('list')
          .then(recurringTasks => {
            return recurringTasks.list
        })
      }
    }
  })
});

module.exports = RecurringTasksType;


