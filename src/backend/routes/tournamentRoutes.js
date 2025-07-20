const express = require('express');
const router = express.Router();
const TournamentController = require('../controllers/tournamentController');
const MatchController = require('../controllers/matchController');

router.route('/')
  .get(TournamentController.list)
  .post(TournamentController.create);

router.route('/:id')
  .get(TournamentController.get)
  .patch(TournamentController.update)
  .delete(TournamentController.remove);

// Nested routes for matches belonging to a tournament
router.post('/:id/matches/schedule', MatchController.scheduleMatches);
router.get('/:id/matches', MatchController.getTournamentMatches);

module.exports = router;
