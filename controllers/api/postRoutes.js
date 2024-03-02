// Import dependencies/files
const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// Create new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Edit an existing post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: req.params.id,
      }
    );
    if (!updatedPost) {
      res.status(404).json({ message: "No post with this ID exists!" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(500);
  }
});

// Delete a post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: req.params.id,
    });
    if (!postData) {
      res.status(404).json({ message: "No post with this ID exists!" });
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(500);
  }
});

// Export module
module.exports = router;
