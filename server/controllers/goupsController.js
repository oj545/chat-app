const asyncHandler = require("../utils/asyncHandler");
const Bll_GROUP = require("../bll/bllGroups");

exports.createGroup = asyncHandler(async (req, res, next) => {
  const { groupMembers, groupName } = req.body;
  const { firstName, lastName, email } = req.user;

  const admin = firstName + " " + lastName;
  const results = Bll_GROUP.createGroup({
    groupMembers: [email, ...groupMembers],
    groupName,
    groupAdmin: admin,
  });

  if (results) {
    res.status(201).json({
      data: {
        groupName,
        consversation: results,
      },
    });
  }
});

exports.updateGroup = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  if (body.addMembers.length === 0) {
    return;
  }

  const updatedGroup = Bll_GROUP.addGroupMembers(id, body);
  const results = await updatedGroup;
  if (results === "success") {
    res.status(201).json({
      status: "success",
    });
  }
});
