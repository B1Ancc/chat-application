const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { Server } = require("socket.io");

const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/nguoi-dung", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/tin-nhan", messageRoute);

// CRUD
app.get("/", (req, res) => {
  res.send("Đang nhận API...");
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

const expressServer = app.listen(port, (req, res) => {
  console.log(`Server đang chạy trên port: ${port}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Đã kết nối với MongoDB!"))
  .catch((error) =>
    console.log("Kết nối với MongoDB thất bại! ", error.message)
  );

const io = new Server(expressServer, { cors: process.env.CLIENT_URL });

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("Kết nối mới", socket.id);

  // Listen connection
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    console.log("onlineUsers", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onlineUsers);
  });
});
