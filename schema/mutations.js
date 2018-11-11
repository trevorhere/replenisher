const graphql = require('graphql');
const mongoose = require('mongoose');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;

const UserType = require('./types/user_type');
const ListType = require('./types/list_type');
const TeamType = require('./types/team_type');

const List = mongoose.model('list');
const User = mongoose.model('user');
const Team = mongoose.model('team');

const AuthService = require('../services/auth');

//future mutations
// - remove list
// - remove items
// - completed items?


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: {type: GraphQLString }
      },
      resolve(parentValue, {email, password }, req ){
        return AuthService.signup({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req){
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString},
        password: {type: GraphQLString}
      },
      resolve(parentValue, {email, password }, req){
        return AuthService.login({ email, password, req });
      }
    },
    createTeam: {
      type: TeamType,
      args: {
        name: { type: GraphQLString },
        leaderID: { type: GraphQLID }
      },
      resolve(parentValue, {name, leaderID }){
        return User.createTeam(name, leaderID)
      }
    },
    // addTaskToList: {
    //   type: ListType,
    //   args: {
    //     content: { type: GraphQLString },
    //     listId: {type: GraphQLID }
    //   },
    //   resolve(parentValue, {content, listId}){
    //     return List.addTask(listId, content)
    //   }
    // },
    // createList: {
    //   type: ListType,
    //   args: {
    //     name: { type: GraphQLString },
    //     ownerID: { type: GraphQLID }
    //   },
    //   resolve(parentValue, {name, ownerID}){
    //     return User.createList(ownerID, name);
    //   }
    // }
  }
});

module.exports = mutation;