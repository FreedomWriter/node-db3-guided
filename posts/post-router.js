const express = require("express");
const postModel = require("./post-model");

const router = express.Router({
  mergeParams: true
});

// router.get("/", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const posts = await db("posts as p")
//       .join("users as u", "u.id", "p.user_id")
//       .where({ user_id: id })
//       .select("p.id", "p.contents", "u.username");

//     res.json(posts);
//   } catch (err) {
//     next(err);
//   }
// });

router.get("/", async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await postModel.find(id);

    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/:postId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { postId } = req.params;
    const posts = await db("posts")
      .where({ user_id: id, id: postId })
      .select();

    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.put("/:postId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { postId } = req.params;
    const { body } = req;
    const posts = await db("posts")
      .where({ user_id: id, id: postId })
      .update(body)
      .select();

    res.json(posts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
