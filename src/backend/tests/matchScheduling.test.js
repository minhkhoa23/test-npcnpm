/* eslint-disable no-undef */
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const ioClient = require("socket.io-client");

const { app, server } = require("../server");
const seedDatabase = require("../utils/seedDatabase");

const Match = require("../models/Match");
const Tournament = require("../models/Tournament");
const Competitor = require("../models/Competitor");
const User = require("../models/User");

jest.setTimeout(30_000);

let mongoServer;
let httpServer;
let baseURL;

beforeAll(async () => {
  // Try to use MongoDB Memory Server, fallback if not available
  try {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    console.log("Using MongoDB Memory Server for tests");
  } catch (error) {
    console.log("MongoDB Memory Server not available, using mock database");
    // Mock mongoose for tests
    const originalConnect = mongoose.connect;
    mongoose.connect = jest.fn().mockResolvedValue(true);

    // Mock the models to return empty arrays/objects
    const mockModels = {
      Tournament: {
        findOne: jest.fn(),
        create: jest.fn(),
        find: jest.fn().mockResolvedValue([]),
      },
      Competitor: {
        find: jest.fn().mockResolvedValue([]),
      },
      Match: {
        deleteMany: jest.fn().mockResolvedValue({}),
        find: jest.fn().mockResolvedValue([]),
        findOne: jest.fn(),
      },
      User: {
        findOne: jest.fn(),
      },
    };

    // Override require for models
    jest.doMock("../models/Tournament", () => mockModels.Tournament);
    jest.doMock("../models/Competitor", () => mockModels.Competitor);
    jest.doMock("../models/Match", () => mockModels.Match);
    jest.doMock("../models/User", () => mockModels.User);
  }

  // Seed dữ liệu mẫu (only if we have real database)
  if (mongoServer) {
    await seedDatabase();
  }

  // Bật server (chưa listen trong server.js)
  httpServer = server.listen(0);
  baseURL = `http://localhost:${httpServer.address().port}`;
});

afterAll(async () => {
  if (httpServer) httpServer.close();
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe("Match scheduling & updating flow", () => {
  let tournamentId;
  let teamIds;

  beforeEach(async () => {
    // Lấy giải Summer Cup và danh sách đội
    const summer = await Tournament.findOne({ name: "Summer Cup 2025" });
    tournamentId = summer._id.toString();
    teamIds = (await Competitor.find({ tournamentId })).map((c) =>
      c._id.toString(),
    );

    // Xoá mọi trận để test độc lập
    await Match.deleteMany({});
  });

  test("Schedule round-robin matches", async () => {
    const res = await request(app)
      .post(`/api/tournaments/${tournamentId}/matches/schedule`)
      .expect(201);

    expect(res.body.message).toBe("Matches scheduled successfully");
    expect(res.body.matches).toHaveLength(6);

    const matches = await Match.find({ tournamentId });
    expect(matches).toHaveLength(6);
    expect(teamIds).toContain(matches[0].teamAId);
    expect(teamIds).toContain(matches[0].teamBId);
  });

  test("Schedule single-elimination matches", async () => {
    const winter = await Tournament.findOne({ name: "Winter Clash" });

    const res = await request(app)
      .post(`/api/tournaments/${winter._id}/matches/schedule`)
      .expect(201);

    expect(res.body.message).toBe("Matches scheduled successfully");
    expect(res.body.matches).toHaveLength(3);

    const matches = await Match.find({ tournamentId: winter._id.toString() });
    expect(matches).toHaveLength(3);
  });

  test("Retrieve matches list", async () => {
    await request(app)
      .post(`/api/tournaments/${tournamentId}/matches/schedule`)
      .expect(201);

    const res = await request(app)
      .get(`/api/tournaments/${tournamentId}/matches`)
      .expect(200);

    expect(res.body).toHaveLength(6);
    const m = res.body[0];
    expect(m).toHaveProperty("teamAId");
    expect(m).toHaveProperty("teamBId");
    expect(m).toHaveProperty("scheduledAt");
    expect(m.teamAId).toHaveProperty("name");
    expect(m.teamBId).toHaveProperty("name");
  });

  test("Update match & receive socket event", async () => {
    // 1. Lên lịch trước
    await request(app)
      .post(`/api/tournaments/${tournamentId}/matches/schedule`)
      .expect(201);

    const match = await Match.findOne({ tournamentId });
    const matchId = match._id;

    // 2. Kết nối socket & join phòng
    const client = ioClient(baseURL, { reconnection: false, timeout: 5000 });
    await new Promise((r) => client.on("connect", r));
    client.emit("joinTournament", tournamentId);

    const eventPromise = new Promise((r) => client.once("matchUpdated", r));

    // 3. Gửi request cập nhật
    await request(app)
      .put(`/api/matches/${matchId}`)
      .send({ result: "win", score: "2-0" })
      .expect(200);

    // 4. Kiểm tra event
    const updated = await eventPromise;
    expect(updated._id).toBe(matchId);
    expect(updated.result).toBe("win");
    expect(updated.score).toBe("2-0");

    client.close();
  });

  test("Return 404 for invalid tournament", async () => {
    const res = await request(app)
      .post("/api/tournaments/invalid_id/matches/schedule")
      .expect(404);

    expect(res.body.message).toBe("Tournament not found");
  });

  test("Return 400 when tournament has < 2 teams", async () => {
    const newTour = await Tournament.create({
      _id: new mongoose.Types.ObjectId().toString(),
      name: "Tiny Cup",
      description: "Test",
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-09-05"),
      format: "round",
      organizerId: (await User.findOne())._id.toString(),
    });

    const res = await request(app)
      .post(`/api/tournaments/${newTour._id}/matches/schedule`)
      .expect(400);

    expect(res.body.message).toBe("Not enough teams");
  });
});
