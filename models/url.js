const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required: true,
    },
    VisitHistory:[{ timestamps: {type: Number} }],
    createBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
},
{timestamps: true}
);

const URL = mongoose.model("url", URLSchema);

module.exports = URL;
