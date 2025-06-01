const {nanoid} = require('nanoid');
const URL  = require('../models/url');


async function handlegenerateURL (req,res){
    const body = req.body ;
    if(!body.url) return res.status(400).json({err :"Error occured" });

    const shortid = nanoid();
await URL.create({
    shortid: shortid,
    redirectURL : body.url,
    VisitHistory:[],
    createBy:  req.user.id,

});

return res.json({id: shortid});
}

async function handleAnalytics(req,res){
    const shortid = req.params.shortid;
    const result = await URL.findOne({shortid});
    return res.json({
        totalClicks: result.VisitHistory.length,
        analytics: result.VisitHistory
    });
   
}


module.exports = {
    handlegenerateURL
}


