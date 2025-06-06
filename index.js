const express = require('express');
const app = express();
const PORT = 8001;
const path = require("path");


const cookie = require ("cookie-parser") 
const urlRoute = require("./router/url");
const { connectDB } = require ("./connect")
const URL = require("./models/url");
const userRoute = require("./router/user")
const static = require("./router/staticrouter");
const {restrictUser,checkAuth,
    checkforauth,restrictTo } = require("./middleware/auth")
// to basically parse the url we use this 

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookie());
app.use(checkforauth)


// to restrict 
app.use("/url", restrictTo("NORMAL"),urlRoute)
app.use("/", checkforauth , static)
app.use('/user', userRoute);


connectDB("mongodb://localhost:27017/user")
.then(()=> console.log("COnnected to MongoDB"));

// get route to redirect to that url 
app.get('/:shortid', async (req,res)=>{
     console.log("Received shortid:", shortid);  // ✅
    const shortid = req.params.shortid;
 
const entry = await URL.findOneAndUpdate(
{
    shortid,
},
{
    $push:{
VisitHistory: {
    timestamp: Date.now(),
},
    },
},
{new: true}
    );

    if (!entry){
        return res.status(404).send('short URL not found')
    }
    res.redirect(entry.redirect);
})




// app.use("url" , urlRoute);


app.listen(PORT,()=>console.log('Server stared successfully'));

