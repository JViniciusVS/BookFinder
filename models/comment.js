const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: String,
  text: String,
  bookId: {
    type: mongoose.Schema.ObjectId,
    ref: "Book"
  }
});

module.exports = mongoose.model("Comment", commentSchema);
