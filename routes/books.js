const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Comment = require("../models/comment");

const books = [
  {
    title: "The Midnight Library",
    description:
      "The Midnight Library by Matt Haig is a novel that follows the life of Nora Seed, who finds herself in a library between life and death, with the opportunity to try out alternate versions of her life and find the one where she truly belongs.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/87/The_Midnight_Library.jpg",
  },
  {
    title: "The Song of Achilles",
    description:
      "Set during the Greek Heroic Age, it is a retelling of the Trojan War as told from the perspective of Patroclus. The novel follows Patroclus' relationship with Achilles, from their initial meeting to their exploits during the Trojan War, with focus on their romantic relationship.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/1/1e/TheSongofAchilles.png",
  },
  {
    title: "Solaris",
    description:
      "Solaris is a 1961 science fiction novel by Polish writer Stanisław Lem. It follows a crew of scientists on a research station as they attempt to understand an extraterrestrial intelligence, which takes the form of a vast ocean on the titular alien planet. The novel is one of Lem's best-known works.",
    image: "https://upload.wikimedia.org/wikipedia/en/d/d1/SolarisNovel.jpg",
  },
];

// Index
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().exec();
    res.render("books", { books });
  } catch (err) {
    console.log(err);
    res.send("you broke it... /index");
  }
});

// Create
router.post("/", async (req, res) => {
  console.log(req.body);
  const genre = req.body.genre.toLowerCase();
  const newBook = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    genre,
    date: req.body.date,
    standAlone: !!req.body.standAlone,
    image: req.body.image,
  };

  try {
    const book = Book.create(newBook);
    console.log(book);
    res.redirect("/books" + book._id);
  } catch (err) {
    console.log(err);
    res.send("You broke it... /books POST");
  }
});

// New
router.get("/new", (req, res) => {
  res.render("books_new");
});

// Search
router.get("/search", async (req, res) => {
  try {
    const books = await Book.find({
      $text: {
        $search: req.query.term,
      },
    });
    res.render("books", { books });
  } catch (err) {
    console.log(err);
    res.send("broken search");
  }
});

// Show
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).exec();
    const comments = await Comment.find({ bookId: req.params.id });
    res.render("books_show", { book, comments });
  } catch (err) {
    console.log(err);
    res.send("You broke it... /books/:id");
  }
});

// Edit
router.get("/:id/edit", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).exec();
    res.render("books_edit", { book });
  } catch (err) {
    console.log(err);
    res.send("Broken... /books/:id/edit");
  }
});

// Update
router.put("/:id/", async (req, res) => {
  const genre = req.body.genre.toLowerCase();
  const bookBody = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    genre,
    date: req.body.date,
    standAlone: !!req.body.standAlone,
    image: req.body.image,
  };

  try {
    const book = await Book.findByIdAndUpdate(req.params.id, bookBody, {
      new: true,
    }).exec();
    res.redirect(`/books/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.send("broken... /books/:id PUT");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id).exec();
    console.log("Deleted:", deletedBook);
    res.redirect("/books");
  } catch (err) {
    console.log(err);
    res.send("Broken... /books/:id DELETE");
  }
});

module.exports = router;
