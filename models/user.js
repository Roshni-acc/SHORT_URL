const mongoose = require ('mongoose')
const schema =  new mongoose.Schema (
    {

        name:{
            type:String,
            required:true,
        },

        email:{
            type:String,
            required:true,
            unique:true,
        },
        role:{
         type : String,
         required: true,
         default: "NORMAL"
        },
        password :{
            type:String,
            requuired : true , 
        },

    },
    {
        timestamp: true 
    }


);


const User = mongoose.model("user",schema);

module.exports = User;
