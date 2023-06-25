const server = require("./app");
const onlineUsers = require("./utils/onlineUsers");
const DAL_CONVERSATION = require("./dal/dalConversations");

//1) config cors
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

//2) sockets events
io.on("connection", (socket) => {
  socket.on("connect_me", (payload) => {
    if (onlineUsers.verifyConnection(payload)) {
      return console.log("this user is allredy connected");
    }
    onlineUsers.connectMe(payload);
  });

  socket.on("get_contact", async (payload) => {
    const contact = onlineUsers.getUser(payload.email);
    const conversation = await DAL_CONVERSATION.getConversaition(
      payload.conversationId
    );
    io.to(payload.mySocketId).emit("get_contact", {
      contactName: payload.contactName,
      contactEmail: payload.email,
      contactId: contact?.socketId,
      conversationId: conversation?._id,
      messages: conversation?.messages,
    });
  });

  socket.on("send_message", (payload) => {
    const { text, sender, date, channel, conversationId } = payload;
    DAL_CONVERSATION.updateMessages(conversationId, { text, sender, date });

    io.to(channel).emit("send_message", { text, sender, date });
  });

  socket.on("group_message", (payload) => {
    const { sender, text, date, conversationId } = payload;
    DAL_CONVERSATION.updateMessages(conversationId, { sender, text, date });

    io.to(conversationId).emit("group_message", { sender, text, date });
  });

  socket.on("join_group", async (payload) => {
    const { channel, groupName } = payload;
    const conversation = await DAL_CONVERSATION.getConversaition(channel);

    socket.join(channel);
    io.to(channel).emit("set_currentGroup", {
      conversation,
      groupName: groupName,
    });
  });

  socket.on("set_currentGroup", async (payload) => {
    io.to(payload.channel).emit("set_currentGroup", {
      conversation,
      name: payload.groupName,
    });
  });

  socket.on("remove_me", (payload) => {
    onlineUsers.disconectUser(payload);
  });

  socket.on("disconnect", () => {
    onlineUsers.disconectUser(socket.id);
  });
});

module.exports = server;
