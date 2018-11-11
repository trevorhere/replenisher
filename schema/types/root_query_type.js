const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require('./user_type');
const ListType = require('./list_type');
const TaskType = require('./task_type');
const TeamType = require('./team_type');

const List = mongoose.model('list');
const Task = mongoose.model('task');
const User = mongoose.model('user');
const Team = mongoose.model('team');


const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:() => ({
    user: {
      type: UserType,
      resolve(parentValue, args, req){
        return req.user
      }
    },
    userID: {
      type: UserType,
      args: {id: {type: new GraphQLNonNull(GraphQLID)}},
        resolve(parentValue, {id}){
          return User.findById(id);
        }
    },
    team: {
      type: TeamType,
      args: {id: {type: new GraphQLNonNull(GraphQLID)}},
        resolve(parentValue, {id}){
          return Team.findById(id);
        }
    },
    list: {
      type: ListType,
      args: {id: { type: new GraphQLNonNull(GraphQLID) }},
        resolve(parentValue, {id}){
          return List.findById(id);
        }
    },
    task: {
      type: TaskType,
      args: {id: { type:  new GraphQLNonNull(GraphQLID)}},
      resolve(parentValue, {id}){
        return Task.findById(id);
      }
    }

  })
});

module.exports = RootQueryType;
