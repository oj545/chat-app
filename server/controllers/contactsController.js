const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const Bll = require("../bll/bllContacts");
const DAL_CONTACT = require("../dal/dalContact");

exports.addContact = asyncHandler(async (req, res, next) => {
  let users = req.body;

  //1) check if contact email exist
  if (!(await User.findOne({ email: users[1].email }))) {
    console.log("this user is not useing this app");
    return;
  }

  const creator = {
    email: users[0].email,
    contactEmail: users[1].email,
    contactName: users[1].name,
  };

  const newContact = {
    email: users[1].email,
    contactEmail: users[0].email,
    contactName: users[0].name,
  };

  users = [creator, newContact];

  //2) create conversation and update user contact list
  const newConversationId = await Bll.addContact(users);

  //3) if every thing OK send data to client
  if (newConversationId) {
    res.status(201).json({
      data: {
        newConversationId,
        newContact: users[1],
      },
    });
  }
});

exports.updateContact = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  DAL_CONTACT.updateBlockList(id, body.blockList);
});
