// const {v4: uuidv4} = require('uuid');
// const User = require('../models/user');
// const {setUser} = require("../service/auth")

// async  function handleUserfunction(req,res){
// const{name, email,password} = req.body;
// await User.create({
//    name,
//    email,
//    password
// });
// // return res.render("home");
// return res.redirect("/login");

// }


// async  function handleLogin(req,res){
//     try{
//     const{email,password} = req.body;
//     const user = await User.findOne({email,password});
//     if(!user){
//         return res.render("login", {
//             error:"Invalid Username or Password",
//         });

//     }
//          const token  = setUser(user);
//         // res.cookie  ("uid", token,{
//             // domain:"www.google.com",
//         // })
//         res.cookie("token" , token);
//         // return res.json({token});
//         return res.redirect("/dashboard");

//     }catch(err){
//      res.status(500).json({ message: "Server error isue " });
//     }
// }
// module.exports = {
//     handleUserfunction,
//     handleLogin,
// }




const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { setUser } = require("../service/auth");

async function handleUserfunction(req, res) {
    const { name, email, password } = req.body;

    // Basic Validation
    if (!name || !email || !password) {
        return res.render("signup", {
            error: "All fields are required!"
        });
    }

    if (password.length < 8) {
        return res.render("signup", {
            error: "Password must be at least 8 characters long."
        });
    }

    // Check for duplicate user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render("signup", {
            error: "Email already exists. Please login."
        });
    }

    await User.create({
        name,
        email,
        password
    });
    // After registration → go to login page
    return res.redirect("/login");
}

async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.render("login", {
                error: "Invalid Username or Password",
            });
        }

        const token = setUser(user);

        // Store token in cookie
        res.cookie("token", token);

        return res.redirect("/dashboard");

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error issue" });
    }
}

async function handleLogout(req, res) {
    res.clearCookie("token");
    res.redirect("/login");
}

module.exports = {
    handleUserfunction,
    handleLogin,
    handleLogout
};
