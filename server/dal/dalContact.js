const User = require("../models/userModel");

const updateOne = async (obj) => {
  const updateUser = await User.findOneAndUpdate(
    { email: obj.find },
    {
      $push: obj.update,
    }
  );

  const update = updateUser ? "success" : "fail";
  return update;
};

const updataContactLiset = async (user, conversationId) => {
  const update = updateOne({
    find: user.email,
    update: {
      contactList: {
        contactName: user.contactName,
        contactEmail: user.contactEmail,
        conversation: conversationId,
      },
    },
  });
  return update;
};

const updatGroupList = async (
  memberEmail,
  groupName,
  conversationId,
  groupId
) => {
  const update = updateOne({
    find: memberEmail,
    update: {
      groupsList: {
        groupName,
        conversation: conversationId,
        groupId,
      },
    },
  });

  return update;
};

const updateBlockList = async (id, payload) => {
  const update = await User.findByIdAndUpdate(id, { blockList: payload });

  if (update) {
    return "success";
  }
};

module.exports = { updataContactLiset, updatGroupList, updateBlockList };
