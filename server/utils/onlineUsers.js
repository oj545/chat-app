let onlineUsers = [];

const connectMe = (payload) => {
  onlineUsers.push(payload);
  return true;
};

const getUser = (payload) => {
  const user = onlineUsers.find((user) => user.email === payload);
  return user;
};

const verifyConnection = (payload) => {
  const isConected = onlineUsers.some((user) => user.email === payload.email);
  return isConected;
};

const disconectUser = (payload) => {
  const x = onlineUsers.filter((user) => user.socketId !== payload);
  onlineUsers = x;
};

module.exports = {
  connectMe,
  disconectUser,
  getUser,
  verifyConnection,
};
