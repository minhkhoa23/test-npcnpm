const News = require('../models/News');
const mongoose = require('mongoose');
const fallbackData = require('../utils/fallbackData');

exports.list = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development-no-db') {
      const news = fallbackData.getNews().filter(n => n.status === 'public');
      return res.json(news);
    }

    const news = await News.find({ status: 'public' }).sort({ publishedAt: -1 });
    res.json(news);
  } catch (err) {
    console.error('Error in news list:', err);
    // Fallback to file data if database fails
    const news = fallbackData.getNews().filter(n => n.status === 'public');
    res.json(news);
  }
};

exports.create = async (req, res) => {
  try {
    const newsItem = await News.create(req.body);
    res.status(201).json(newsItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'News not found' });
    }

    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ message: 'News not found' });
    res.json(newsItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'News not found' });
    }

    const newsItem = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!newsItem) return res.status(404).json({ message: 'News not found' });
    res.json(newsItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'News not found' });
    }

    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) return res.status(404).json({ message: 'News not found' });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
