const express = require("express")
const router = express.Router({mergeParams: true})
const Comment = require("../models/comment")

// Show form for new comment
router.get("/new", (req, res) => {
    res.render("comments_new", { bookId: req.params.id });
  });
  
  // Actually create new comments
  router.post("/", (req, res) => {
    Comment.create({
      user: req.body.user,
      text: req.body.text,
      bookId: req.body.bookId,
    })
      .then((newComment) => {
        console.log(newComment);
        res.redirect(`/books/${req.body.bookId}`);
      })
      .catch((err) => {
        console.log(err);
        res.redirect(`/books/${req.body.bookId}`);
      });
  });

module.exports = router