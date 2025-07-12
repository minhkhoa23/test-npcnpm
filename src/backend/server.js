// src/backend/server.js
require('dotenv').config();

const express  = require('express');
const http     = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// routes
app.use('/api/tournaments', require('./routes/tournamentRoutes'));
app.use('/api/matches',     require('./routes/matchRoutes'));

// socket.io
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET','POST','PUT','PATCH','DELETE'],
  },
});
require('./utils/matchSocket')(io);

// connect & seed (chỉ khi NODE_ENV != 'test')
async function connectAndSeed() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('❌  MONGO_URI chưa được thiết lập');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('✅  MongoDB connected');
  if (process.env.SEED_DB === 'true') {
    const seed = require('./utils/seedDatabase');
    await seed();
    console.log('✅  Database seeded');
  }
}

(async () => {
  if (process.env.NODE_ENV !== 'test') {
    try {
      await connectAndSeed();
      const PORT = process.env.PORT || 5000;
      httpServer.listen(PORT, () =>
        console.log(`🚀  Server running on :${PORT}`));
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
})();

module.exports = { app, server: httpServer, io };
