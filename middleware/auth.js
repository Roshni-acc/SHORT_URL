const {getUser} = require ("../service/auth");

// authentication 
function checkforauth(req,res,next){
    // const authorizationheadervalue = req.headers['authorization'];
    const tokencookievalue = req.cookies?.token;
    req.user = null;
    // if(!authorizationheadervalue || !authorizationheadervalue.startsWith('Bearer'))
     if(!tokencookievalue)
    return next();

    const token = tokencookievalue;
   const user =  getUser(token)
   req.user = user;
    return next();
}

// authorization 
function restrictTo(roles = []){
    return function (req,res,next){
    if(!req.user) return res.redirect("/login");

    if(roles.includes(req.user.role)) return res.end("Unauthroized");

    return next();
    };
}
async function restrictUser(res,req,next){
    const UserId = req.headers['authorizaton'];


    if(!UserId) return res.redirect("/login");
    const token  = UserId.split("Bearer ")[1]; // token 
    const user = getUser(UserId);

    if(!user) return res,redirect("/login");

    req.user = user; 
    next();
}


async function checkAuth(req,res,next){
    const UserId = req.headers['authorizaton'];
    const token  = UserId.split("Bearee ")[1];
       const user = getUser(UserId);
       req.user = user; 
       next();
}

module.exports = {
    restrictUser,checkAuth,
    checkforauth,restrictTo,


}