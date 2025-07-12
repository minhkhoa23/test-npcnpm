// src/backend/server.js
require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// routes
app.use("/api/tournaments", require("./routes/tournamentRoutes"));
app.use("/api/matches", require("./routes/matchRoutes"));

// socket.io
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});
require("./utils/matchSocket")(io);

// connect & seed (chỉ khi NODE_ENV != 'test')
async function connectAndSeed() {
  // Skip MongoDB connection in development mode if specified
  if (process.env.NODE_ENV === "development-no-db") {
    console.log("🔧  Running in development mode without database");
    return;
  }

  let uri = process.env.MONGO_URI;

  // Use MongoDB Memory Server for development if no MONGO_URI is set or if connection fails
  if (!uri || uri === "mongodb://localhost:27017/tournament") {
    try {
      const { MongoMemoryServer } = require("mongodb-memory-server");
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log("📦  Using MongoDB Memory Server for development");
    } catch (error) {
      console.log(
        "⚠️  MongoDB Memory Server not available, trying fallback...",
      );

      // Try to connect to localhost first
      try {
        uri = "mongodb://localhost:27017/tournament";
        mongoose.set("strictQuery", true);
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
        console.log("✅  MongoDB connected to localhost");
      } catch (localError) {
        console.log(
          "⚠️  Local MongoDB not available, running without database",
        );
        process.env.NODE_ENV = "development-no-db";
        return;
      }

      if (process.env.SEED_DB === "true") {
        const seed = require("./utils/seedDatabase");
        await seed();
        console.log("✅  Database seeded");
      }
      return;
    }
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("✅  MongoDB connected");
  if (process.env.SEED_DB === "true") {
    const seed = require("./utils/seedDatabase");
    await seed();
    console.log("✅  Database seeded");
  }
}

(async () => {
  if (process.env.NODE_ENV !== "test") {
    try {
      await connectAndSeed();
      const PORT = process.env.PORT || 5000;
      httpServer.listen(PORT, () =>
        console.log(`🚀  Server running on :${PORT}`),
      );
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
})();

module.exports = { app, server: httpServer, io };
