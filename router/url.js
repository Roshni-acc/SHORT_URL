const express = require('express');
const { handlegenerateURL , handleRedirectURL  } = require('../controllers/url');
const router = express.Router()
router.post('/', handlegenerateURL);
router.get('/:shortId', handleRedirectURL);
// router.get('/analytics',)

// router.get('/analytics/:shortid', handleAnalytics);
module.exports= router;
