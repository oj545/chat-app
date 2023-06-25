const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupAdmin: { type: String },
  groupName: {
    type: String,
    required: [true, "please provide a Group Name"],
  },
  groupMembers: {
    type: [Object],
    required: [true, "please provide a Group members"],
  },
  groupConversation: {
    type: String,
  },
});

const Group = mongoose.model("group", groupSchema);
module.exports = Group;
