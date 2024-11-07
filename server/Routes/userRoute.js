const express = require("express");
const { registerUser, loginUser, findUser, getUsers } = require("../Controllers/userController");

const router = express.Router();

router.post("/dang-ky", registerUser);
router.post("/dang-nhap", loginUser);
router.get("/tim-kiem/:userId", findUser);
router.get("/", getUsers);

module.exports = router;
