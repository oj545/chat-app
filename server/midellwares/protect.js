const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // 1) Getting token and check of it's there
  if (
    req.headers.authorizaton &&
    req.headers.authorizaton.startsWith("Bearer")
  ) {
    token = req.headers.authorizaton.split(" ")[1];
  }

  if (!token) {
    return next(
      new Error("You are not logged in! Please log in to get access")
    );
  }
  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findOne({ _id: decoded.id });
  if (!currentUser) {
    return next(
      new Error("The user belonging to this token does no longer exist.")
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE

  req.user = currentUser;
  next();
});
