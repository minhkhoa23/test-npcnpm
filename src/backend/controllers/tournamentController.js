const Tournament = require('../models/Tournament');
const mongoose = require('mongoose');
const fallbackData = require('../utils/fallbackData');

exports.list = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development-no-db') {
      const tournaments = fallbackData.getTournaments();
      return res.json(tournaments);
    }

    const tournaments = await Tournament.find().populate('teams');
    res.json(tournaments);
  } catch (error) {
    console.error('Error in tournament list:', error);
    // Fallback to file data if database fails
    const tournaments = fallbackData.getTournaments();
    res.json(tournaments);
  }
};

exports.create = async (req, res) => {
  try {
    const tournament = await Tournament.create(req.body);
    res.status(201).json(tournament);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    const tournament = await Tournament.findById(req.params.id).populate('teams');
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json(tournament);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json(tournament);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Tournament not found' });
    }

    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
