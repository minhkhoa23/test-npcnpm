const Highlight = require('../models/Highlight');
const mongoose = require('mongoose');
const fallbackData = require('../utils/fallbackData');

exports.list = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development-no-db') {
      const highlights = fallbackData.getHighlights().filter(h => h.status === 'public');
      return res.json(highlights);
    }

    const highlights = await Highlight.find({ status: 'public' }).sort({ createdAt: -1 });
    res.json(highlights);
  } catch (err) {
    console.error('Error in highlights list:', err);
    // Fallback to file data if database fails
    const highlights = fallbackData.getHighlights().filter(h => h.status === 'public');
    res.json(highlights);
  }
};

exports.create = async (req, res) => {
  try {
    const highlight = await Highlight.create(req.body);
    res.status(201).json(highlight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Highlight not found' });
    }

    const highlight = await Highlight.findById(req.params.id);
    if (!highlight) return res.status(404).json({ message: 'Highlight not found' });
    res.json(highlight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Highlight not found' });
    }

    const highlight = await Highlight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!highlight) return res.status(404).json({ message: 'Highlight not found' });
    res.json(highlight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Highlight not found' });
    }

    const highlight = await Highlight.findByIdAndDelete(req.params.id);
    if (!highlight) return res.status(404).json({ message: 'Highlight not found' });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
