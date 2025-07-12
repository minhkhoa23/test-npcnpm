// src/backend/controllers/matchController.js

const mongoose   = require('mongoose');
const Match      = require('../models/Match');
const Tournament = require('../models/Tournament');
const Competitor = require('../models/Competitor');

// List all matches
exports.list = async (req, res) => {
  const matches = await Match.find().populate('teamAId teamBId');
  res.json(matches);
};

// Create a match
exports.create = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single match
exports.get = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate('teamAId teamBId');
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a match and emit socket event
exports.update = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!match) return res.status(404).json({ message: 'Match not found' });

    const io = req.app.get('io');
    io.to(match.tournamentId.toString()).emit('matchUpdated', match);
    return res.json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a match
exports.remove = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get matches for a specific tournament
exports.getTournamentMatches = async (req, res) => {
  try {
    const matches = await Match.find({ tournamentId: req.params.id })
      .populate('teamAId teamBId');
    res.json(matches);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Schedule matches for a tournament
exports.scheduleMatches = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    const competitors = await Competitor.find({ tournamentId: tournament._id });
    console.log('[DEBUG] competitor count for tournament', req.params.id, '=', competitors.length);
    if (competitors.length < 2) {
      return res.status(400).json({ message: 'Not enough teams' });
    }

    const matchesToCreate = [];
    if (tournament.format === 'single') {
      for (let i = 1; i < competitors.length; i++) {
        matchesToCreate.push({
          tournamentId: tournament._id,
          teamAId:      competitors[0]._id,
          teamBId:      competitors[i]._id,
          scheduledAt:  new Date()
        });
      }
    } else {
      for (let i = 0; i < competitors.length; i++) {
        for (let j = i + 1; j < competitors.length; j++) {
          matchesToCreate.push({
            tournamentId: tournament._id,
            teamAId:      competitors[i]._id,
            teamBId:      competitors[j]._id,
            scheduledAt:  new Date()
          });
        }
      }
    }

    const createdMatches = await Match.insertMany(matchesToCreate);
    const io = req.app.get('io');
    io.to(req.params.id).emit('matchesScheduled', createdMatches);

    return res.status(201).json({
      message: 'Matches scheduled successfully',
      matches: createdMatches
    });
  } catch (err) {
    console.error('[ERROR scheduleMatches]', err);
    return res.status(400).json({ error: err.message });
  }
};