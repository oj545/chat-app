const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  messages: {
    type: [Object],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  contacts: {
    type: [String],
  },
});

const Conversation = mongoose.model("conversation", conversationSchema);
module.exports = Conversation;
