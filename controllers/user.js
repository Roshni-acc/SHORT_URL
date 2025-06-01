const {v4: uuidv4} = require('uuid');
const User = require('../models/user');
const {setUser} = require("../service/auth")

async  function handleUserfunction(req,res){
const{name, email,password} = req.body;
await User.create({
   name,
   email,
   password
});
// return res.render("home");
return res.redirect("/");

}


async  function handleLogin(req,res){
    const{email,password} = req.body;
    const user = await User.findOne({email,pasword});
    if(!user){
        return res.render("login", {
            error:"Invalid Username or Password",
        });
     
    }
         const token  = setUser(user);
        // res.cookie  ("uid", token,{
            // domain:"www.google.com",
        // })
        res.cookie("token" , token);
        return res.json({token});
        return redirect("/");
    
    }

module.exports = {
    handleUserfunction,
    handleLogin,
}