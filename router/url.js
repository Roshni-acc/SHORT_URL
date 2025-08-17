const express = require('express');
const { handlegenerateURL } = require('../controllers/url');
const router = express.Router()
router.post('/', handlegenerateURL);
// router.get('/analytics',)

// router.get('/analytics/:shortid', handleAnalytics);
module.exports= router;
