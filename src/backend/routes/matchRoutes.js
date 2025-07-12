const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/matchController');

router.route('/')
  .get(MatchController.list)
  .post(MatchController.create);

router.route('/:id')
  .get(MatchController.get)
  .patch(MatchController.update)
  .delete(MatchController.remove);

module.exports = router;