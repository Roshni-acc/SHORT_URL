// const mongoose = require('mongoose');

// const URLSchema = new mongoose.Schema({
//     shortID:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     redirectURL:{
//         type:String,
//         required: true,
//     },
//     VisitHistory:[{ timestamps: {type: Number} }],
//     createdBy:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"users",
//     }
// },
// {timestamps: true}
// );

// const URL = mongoose.model("url", URLSchema);

// module.exports = URL;



const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    VisitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", URLSchema);

module.exports = URL;

