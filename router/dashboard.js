const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { getUser } = require("../service/auth");

router.get("/", async (req, res) => {
  try {
    const user = getUser(req.cookies.token);
    if (!user) {
      return res.redirect("/login");
    }

    const urls = await URL.find({}); // fetch all shortened URLs

    return res.render("dashboard", { urls });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error yuoppppp");
  }
});

module.exports = router;
