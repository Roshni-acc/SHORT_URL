const express = require('express');
const { handleUserfunction, handleLogin, handleLogout } = require('../controllers/user');

const router = express.Router();

router.post("/", handleUserfunction);
router.post("/login", handleLogin);
router.get("/logout", handleLogout);


module.exports = router;