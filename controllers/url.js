// const { nanoid } = require("nanoid");
// const URL = require("../models/url");

// async function handlegenerateURL(req, res) {
//   const body = req.body;
//   console.log(body , 'bodydd');
//   if (!body.url) return res.status(400).json({ err: "Error occured t" });

//   const shortid = nanoid(8);
//   await URL.create({
//     shortID: shortid,
//     redirectURL: body.url,
//     VisitHistory: [],
//     createdBy: req.user ? req.user._id : null, // safe check
//   });

//   return res.json({ id: shortid });
// }

// async function handleAnalytics(req, res) {
//   const shortid = req.params.shortid;
//   const result = await URL.findOne({ shortid });
//   return res.json({
//     totalClicks: result.VisitHistory.length,
//     analytics: result.VisitHistory,
//   });
// }

// module.exports = {
//   handlegenerateURL,
// };



const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handlegenerateURL(req, res) {
  try {
    const body = req.body;
    console.log(body, "bodydd");

    if (!body.url) {
      return res.status(400).json({ err: "URL is required" });
    }

    const shortID = nanoid(8);

    await URL.create({
      shortID, // ✅ matches schema
      redirectURL: body.url,
      VisitHistory: [],
      createdBy: req.user ? req.user._id : null,
    });

    return res.json({ id: shortID });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
}

// redirection 
async function handleRedirectURL(req, res) {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOne({ shortID: shortId });

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Track visit history
        entry.VisitHistory.push({ timestamps: Date.now() });
        await entry.save();

        // Redirect to original URL
        return res.redirect(entry.redirectURL);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}

async function handleAnalytics(req, res) {
  try {
    const { shortid } = req.params;
    const result = await URL.findOne({ shortID: shortid });

    if (!result) {
      return res.status(404).json({ err: "Short URL not found" });
    }

    return res.json({
      totalClicks: result.VisitHistory.length,
      analytics: result.VisitHistory,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
}

module.exports = {
  handlegenerateURL,
  handleAnalytics,
  
  handleRedirectURL 
};
