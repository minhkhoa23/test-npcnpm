const express = require('express');
const router = express.Router();
const NewsController = require('../controllers/newsController');

router.route('/')
  .get(NewsController.list)
  .post(NewsController.create);

router.route('/:id')
  .get(NewsController.get)
  .patch(NewsController.update)
  .delete(NewsController.remove);

module.exports = router;
