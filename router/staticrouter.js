const { restrictTo } = require("../middleware/auth");
const URL = require ("../models/url");
const express = require ('express');
const router = express.Router();

router.get("/",restrictTo(['NORMAL']) ,  async(req,res)=>{
    // if(!req.user) return res.redirect("/login")
    const AllURL = await URL.find({createdBy: req.user._id});
    return res.render("home",{
        urls: AllURL,
    })
})


router.get("/signup",(req,res)=>{
    return res.render("signup");
});
router.get("/login" , (req,res)=> {
    return  res.render("login");
}) 

module.exports = router ; 