module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/tournament',
  port: process.env.PORT || 5000,
  socketCors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
};