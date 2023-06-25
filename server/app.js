const express = require("express");
const http = require("http");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const contactsRouter = require("./routes/contactsRouter");
const goupsRouter = require("./routes/groupsRouter");
const app = express();

const server = http.createServer(app);

// 1) securety
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

// 2) routes
app.use("/api/chet-app/uath", authRouter);
app.use("/api/chet-app/contacts", contactsRouter);
app.use("/api/chet-app/goups", goupsRouter);

module.exports = server;
