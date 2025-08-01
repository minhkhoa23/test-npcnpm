const express = require('express');
const router = express.Router();
const HighlightController = require('../controllers/highlightController');

router.route('/')
  .get(HighlightController.list)
  .post(HighlightController.create);

router.route('/:id')
  .get(HighlightController.get)
  .patch(HighlightController.update)
  .delete(HighlightController.remove);

module.exports = router;
