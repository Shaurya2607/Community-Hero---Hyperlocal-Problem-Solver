const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const issueRoutes = require("./routes/issueRoutes");
const commentRoutes = require("./routes/commentRoutes");
const insightsRoutes = require("./routes/insightsRoutes");
const duplicateRoutes = require("./routes/duplicateRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const communityRoutes = require("./routes/communityRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const myIssueRoutes = require("./routes/myIssueRoutes");
const upvoteRoutes = require("./routes/upvoteRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/duplicate", duplicateRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/myissues", myIssueRoutes);
app.use("/api/upvotes", upvoteRoutes);
app.use("/api/ai", aiRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 Community Hero API Running...");
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Working",
    database: "Connected",
    timestamp: new Date().toISOString(),
  });
});

// 404 Route (Keep this LAST)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
