const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  competitionId: {
    type: Number,
    required: true
  },
  admin: {
    type: Schema.Types.ObjectId,
    required: true
  },
  invitedFriends: {
    type: Array
  },
  members: {
    type: Array,
    required: true
  }
});

module.exports = Group = mongoose.model('group', GroupSchema);
