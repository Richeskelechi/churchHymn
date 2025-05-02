// routes/hymnRoutes.js
const express = require('express');
const hymnController = require('../controllers/hymnController');
const router = express.Router();

router.post('/', hymnController.createHymn);
router.get('/', hymnController.getAllHymns);
router.get('/search', hymnController.searchHymns);
router.get('/:id', hymnController.getHymnById);
router.delete('/:id', hymnController.deleteHymn);
router.patch('/:id/status', hymnController.updateStatus);
router.patch('/:id/visibility', hymnController.toggleVisibility);
router.patch('/:id', hymnController.updateHymn);

module.exports = router;
