const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  genre: String,
  date: Date,
  standAlone: Boolean,
  image: String,
});

bookSchema.index({
  "$**": "text"
})

module.exports = mongoose.model("Book", bookSchema);