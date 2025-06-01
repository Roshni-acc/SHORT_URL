// const sessionidToUserMap = new Map();// state maintainng e
const jwt  = require("jsonwebtoken");
const secret = "Roshni@2025"
// function setUser(id , user){
//     sessionidToUserMap.set(id, user)
// }

function setUser(user){
   return jwt.sign(
    {
    _id: user._id,
    email: user.email,
   },
   secret 
);
}
// function getUser(id){
//     return sessionidToUserMap.get(id);
// }
function getUser(token ){
    if(!token){
        try {
            return jwt.verify(token, secret )
        }
        catch{
            return null ;
        }
        
    }
   
}

module.exports = {
    setUser,
    getUser,
}