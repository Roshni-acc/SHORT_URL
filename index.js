
const express = require('express');
const app = express();
const PORT = 8001;
const path = require("path");
const cookie = require("cookie-parser");

const { connectDB } = require("./connect");
const URL = require("./models/url");
const User = require("./models/user");

// Routers
const urlRoute = require("./router/url");
const userRoute = require("./router/user");
const staticRoute = require("./router/staticrouter");
const dashboardRoute = require("./router/dashboard");

// Middlewares
const {
  restrictUser,
  checkAuth,
  checkforauth,
  restrictTo
} = require("./middleware/auth");

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());

// ---------------- Public Routes (no auth required) ----------------
app.use("/user", userRoute);          // register, login routes
app.use("/", staticRoute);            // static pages like home, about, etc.

// ---------------- Short URL redirect route ----------------
app.get('/u/:shortid', async (req, res) => {
  const shortid = req.params.shortid;
  console.log("Received shortid:", shortid);

  const entry = await URL.findOneAndUpdate(
    { shortID: shortid },
    {
      $push: {
        VisitHistory: { timestamp: Date.now() },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).send('Short URL not found');
  }
  res.redirect(entry.redirectURL);
});


// ---------------- Protected Routes (auth required) ----------------
app.use(checkforauth);                // apply authentication middleware after public routes

app.use("/url", restrictTo("NORMAL"), urlRoute);
app.use("/dashboard", dashboardRoute);


// ---------------- Login route (basic) ----------------
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).send("Invalid credentials");
  }

  // You can set a cookie or JWT token here
  res.send("Login successful");
});

// ---------------- Connect DB and start server ----------------
connectDB("mongodb://localhost:27017/user")
  .then(() => console.log("Connected to MongoDB"));

app.listen(PORT, () => console.log(`Server started successfully on PORT ${PORT}`));
