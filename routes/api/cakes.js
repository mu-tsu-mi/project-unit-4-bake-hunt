const express = require('express');
const router = express.Router();
const cakesCtrl = require('../../controllers/api/cakes');

// GET /api/cakes
router.get('/', cakesCtrl.index)

module.exports = router;