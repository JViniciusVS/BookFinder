// ========== IMPORTS ==============

// NPM Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");

// Config Import
const config = require("../9 Yelp Comics/config");

// Route Imports
const mainRoutes = require("./routes/main");
const bookRoutes = require("./routes/books");
const commentRoutes = require("./routes/comments");
const authRoutes = require("./routes/auth");

// Model Imports
const Book = require("./models/book");
const Comment = require("./models/comment");
const User = require("./models/user");

// ========== DEVELOPMENT ==============

// Morgan
app.use(morgan("tiny"));

// Seed the DB

// ========== CONFIG ==============

// Body Parser Config
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(config.db.connection)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error connecting to MongoDB Atlas:", err));

// Express Config
app.set("view engine", "ejs");
app.use(express.static("public"));

// Express Session Config
app.use(
  expressSession({
    secret: "aaaaaaa",
    resave: false,
    saveUninitialized: false,
  })
);

// Method Override Config
app.use(methodOverride("_method"));

// Passport Config
app.use(passport.initialize());
app.use(passport.session()); // allows persistent sessions
passport.serializeUser(User.serializeUser()); // tell us what data should be stored in session
passport.deserializeUser(User.deserializeUser()); // get the user data from the stored session
passport.use(new LocalStrategy(User.authenticate())); // use the local strategy

// Route Config
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/books", bookRoutes);
app.use("/books/:id/comments", commentRoutes);

// ========== LISTEN ==============

app.listen(3000, () => {
  console.log("yelp comics is listening...");
});
