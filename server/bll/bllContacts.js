const asyncHandler = require("../utils/asyncHandler");
const DAL_CONTACT = require("../dal/dalContact");
const DAL_CONVERSATION = require("../dal/dalConversations");

const addContact = asyncHandler(async (users) => {
  // 1) create conversation
  const emails = users.map((user) => user.email);
  const conversationId = await DAL_CONVERSATION.createConversation(emails);

  // 2) add conversation id to each users
  const verifiyUpdates = users.map(
    async (user) => await DAL_CONTACT.updataContactLiset(user, conversationId)
  );

  if (Promise.all(verifiyUpdates).then((value) => value === "success")) {
    return conversationId;
  }
});

const deleteContact = asyncHandler(async () => {});

module.exports = { addContact, deleteContact };
