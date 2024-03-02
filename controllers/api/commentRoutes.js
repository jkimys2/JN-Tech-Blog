const router = require("express").Router();
const { Comment, Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all comments
router.get("/", async (req, res) => {
  try {
    // Get all comments and JOIN with user data
    const commentData = await Comment.findAll({});

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("comment", {
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get comments from 1 post
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: { id: req.params.id },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const Comment = await Comment.destroy({
      where: { id: req.params.id },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment with this ID exists!" });
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(500);
  }
});

// Export module
module.exports = router;
