const Group = require("../models/gropsModel");

const createGroup = async (payload) => {
  const newGroup = await Group.create({ ...payload });
  return newGroup;
};

const addMembers = async (id, payload) => {
  const updateGroup = await Group.findOneAndUpdate(
    { _id: id },
    { $push: { groupMembers: { $each: payload } } }
  );
  return updateGroup;
};
const deleteGroup = async () => {};

module.exports = { createGroup, addMembers, deleteGroup };
