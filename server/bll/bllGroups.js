const asyncHandler = require("../utils/asyncHandler");
const DAL_GROUP = require("../dal/dalGroup");
const DAL_CONVERSATION = require("../dal/dalConversations");
const DAL_CONTACT = require("../dal/dalContact");
const veryFiyUpdates = require("../utils/veryfiyUpdates");

exports.createGroup = asyncHandler(async (payload) => {
  // 1) create new conversation
  const groupConversationId = await DAL_CONVERSATION.createConversation(
    payload.groupMembers
  );

  //2) create the group
  const newGroup = await DAL_GROUP.createGroup({
    ...payload,
    groupConversationId,
  });

  //3) update all the members groupList
  const updateMembers = payload.groupMembers.map(
    async (member) =>
      await DAL_CONTACT.updatGroupList(
        member,
        payload.groupName,
        groupConversationId,
        newGroup._id
      )
  );

  // 4) veryfiy that update was success for every group member
  if (Promise.all(updateMembers).then((value) => value === "success")) {
    return groupConversationId.id;
  }
});

exports.addGroupMembers = asyncHandler(async (id, payload) => {
  const { addMembers, groupName, conversationId } = payload;

  // add group to new members goupList
  const upadateContacts = addMembers.map((member) =>
    DAL_CONTACT.updatGroupList(member, groupName, conversationId, id)
  );

  // update group conversation contacts
  const updateConversation = await DAL_CONVERSATION.updateContacts(
    conversationId,
    addMembers
  );

  if (
    (await veryFiyUpdates(upadateContacts)) &
    (typeof updateConversation === "object")
  ) {
    return "success";
  } else {
    return "fail";
  }
});
