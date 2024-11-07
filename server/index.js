const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
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

app.listen(port, (req, res) => {
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
