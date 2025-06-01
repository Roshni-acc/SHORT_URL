const express = require ('express');
const { handleUserfunction , handleLogin} = require('../controllers/user');

const router = express.Router();

router.post("/",handleUserfunction);
router.post("/login",handleLogin);


module.exports = router ;