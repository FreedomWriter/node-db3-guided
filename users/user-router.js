const express = require("express");
const userModel = require("./user-model");
const postRouter = require("../posts/post-router");
const db = require("../data/db-config.js");

const router = express.Router();

router.use("/:id/posts", postRouter);

router.get("/", async (req, res) => {
  userModel
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  userModel
    .findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Could not find user with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get user" });
    });
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = await userModel.add(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.update(id, req.body);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Could not find user with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await userModel.remove(id);
    console.log(deletedCount);
    if (deletedCount) {
      res.json({ removed: deletedCount });
    } else {
      res.status(404).json({ message: "Could not find user with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = router;
