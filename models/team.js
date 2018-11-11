const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
}, {usePushEach: true});



TeamSchema.statics.fetchMembers = function(id){
  return this.findById(id)
    .populate('members')
    .then(team => team.members);
}

// ListSchema.statics.addListItem = function(id, content ){
//   const ListItem = mongoose.model('listItem');

//     return this.findById(id)
//       .then(list => {
//         const listItem = new ListItem({ content, list })
//         list.items.push(listItem)
//         return Promise.all([listItem.save(), list.save()])
//           .then(([listItem, list]) => list);
//       });
// }

// ListSchema.statics.findListItems = function(id){
//   return this.findById(id)
//     .populate('items')
//     .then(list => list.items);
// }

mongoose.model('team', TeamSchema);