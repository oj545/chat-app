const Conversation = require("../models/ConversationModel");
const asyncHandler = require("../utils/asyncHandler");

const createConversation = asyncHandler(async (users) => {
  const newConversation = await Conversation.create({
    contacts: [...users],
  });

  if (!newConversation) {
    return;
  }

  return newConversation.id;
});

const updateMessages = asyncHandler(async (id, payload) => {
  await Conversation.findByIdAndUpdate(id, {
    $push: {
      messages: { ...payload },
    },
  });
});

const getConversaition = asyncHandler(async (id) => {
  const conversation = await Conversation.findById(id);
  return conversation;
});

const updateContacts = asyncHandler(async (id, payload) => {
  const updateCoversation = await Conversation.findOneAndUpdate(
    { _id: id },
    { $push: { contacts: { $each: payload } } }
  );

  return updateCoversation;
});

module.exports = {
  createConversation,
  updateMessages,
  getConversaition,
  updateContacts,
};
