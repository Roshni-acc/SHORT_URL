const express = require('express');
const { handlegenerateURL , handleRedirectURL , handleAnalytics  } = require('../controllers/url');
const router = express.Router()
router.post('/', handlegenerateURL);
router.get('/analytics/:shortid', handleAnalytics);
router.get('/:shortId', handleRedirectURL);
// router.get('/analytics',)


module.exports= router;
