const server = require("./socket.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log("DB connected successfuly"));

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`socket server connect on PORT ${port}`));
