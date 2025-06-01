const mongoose = require('mongoose');

async function connectDB(url){
  return mongoose.connect(url);
}

module.exports= {
    connectDB,
}


// if we receive any kind of issue regarding that then we need to do 

// mongoose.set("the warning say - strictQuery" , true );