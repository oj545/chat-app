const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToket = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const sendToken = (user, statusCode, req, res) => {
  const { _id, firstName, lastName, email, groupsList, contactList } = user;
  const token = createToket(user.id);
  res.cookie("test", token);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    data: {
      token,
      userDtails: { id: _id, firstName, lastName, email },
      contactList,
      groupsList,
    },
  });
};

exports.signup = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  //1) confirm passwords
  const comperPasswords = password === confirmPassword;
  if (!comperPasswords) {
    // return next(new AppError("Password are not the same", 401));
    return;
  }

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });
  if (!newUser) {
    // throw new err
  }

  sendToken(newUser, 201, req, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // throw new err
    return;
  }
  // 1 check if user exsist
  const user = await User.findOne({ email });

  //2) chek the password is currect
  if (!user || !(await bcrypt.compare(password, user.password))) {
    // thro new err
    return;
  }

  // if every thing OK  send token to client
  sendToken(user, 201, req, res);
});

exports.getMe = (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
