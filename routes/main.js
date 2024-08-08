const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("landing");
  });

router.get("/account", isLoggedIn, (req, res) => {
  res.render("account")
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect("/login")
}

module.exports = router