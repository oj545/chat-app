const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please tell us your First Name"],
  },
  lastName: {
    type: String,
    required: [true, "please tell us your Last Name"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    // vallidate: [validator.isEmail, "Pleas provide yuor email"],
  },

  password: {
    type: String,
    required: [true, "please provide Password"],
  },
  contactList: {
    type: [
      {
        contactName: String,
        contactEmail: { type: String, required: true },
        conversation: String,
      },
    ],
    default: [],
  },
  groupsList: {
    type: [
      {
        conversation: String,
        groupName: String,
        groupId: String,
      },
    ],
    default: [],
  },
  blockList: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
