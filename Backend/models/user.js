const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Gamification
    badges: {
      type: Number,
      default: 0,
    },

    points: {
      type: Number,
      default: 0,
    },

    level: {
      type: Number,
      default: 1,
    },

    title: {
      type: String,
      default: "Community Starter",
    },

    reportsCount: {
      type: Number,
      default: 0,
    },

    resolvedCount: {
      type: Number,
      default: 0,
    },

    upvotesReceived: {
      type: Number,
      default: 0,
    },

    verifiedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
