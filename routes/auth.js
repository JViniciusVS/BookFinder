const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

// Sign Up - New
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Sign Up - Create
router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.register(
      new User({
        username: req.body.username,
        email: req.body.email,
      }),
      req.body.password
    );

    console.log(newUser);

    passport.authenticate("local")(req, res, () => {
      res.redirect("/books");
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// Login - Show Form
router.get("/login", (req, res) => {
  res.render("login");
});

// Login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/books",
    failureRedirect: "/login",
  })
);

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {return next(err)}
    res.redirect("/books");
  });
});

module.exports = router;
