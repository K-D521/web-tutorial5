const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const userData = [
  {
    email: "kuldeep@gmail.com",
    firstName: "kuldeep",
    userId: "1",
  },
  {
    email: "raj@gmail.com",
    firstName: "raj",
    userId: "2",
  },
  {
    email: "kd@gmail.com",
    firstName: "kd",
    userId: "3",
  },
  {
    email: "jeet@gmail.com",
    firstName: "jeet",
    userId: "4",
  },
];

router.get("/users", (req, res) => {
  try {
    res.status(200).json({
      message: "Users retrieved",
      success: true,
      data: userData,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

router.post("/add", (req, res) => {
  try {
    const newUser = req.body;
    if (!newUser?.email || !newUser?.firstName) {
      return res.status(400).json({
        status: "error",
        message: "Email and first name are required",
      });
    }
    const userId = crypto.randomBytes(16).toString("hex");
    newUser["userId"] = userId;
    userData.push(newUser);
    res.status(200).json({
      message: "User added",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

router.get("/user/:userId", (req, res) => {
  try {
    const userId = req.params.userId;
    const foundUser = userData.find((user) => user.userId === userId);
    if (!foundUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user: foundUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

router.put("/update/:userId", (req, res) => {
  try {
    const userId = req.params.userId;
    const { email, firstName } = req.body;
    const userIndex = userData.findIndex((user) => user.userId === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    if (email) {
      userData[userIndex].email = email;
    }
    if (firstName) {
      userData[userIndex].firstName = firstName;
    }
    res.status(200).json({
      message: "User updated",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

module.exports = router;
