
const mongoose = require("mongoose");

const processHistorySchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileType: {
      type: String,
      enum: ["csv", "xlsx"],
      required: true,
    },

    percentage: {
      type: Number,
      enum: [10, 20, 25, 33, 50, 100],
      required: true,
    },

    method: {
      type: String,
      enum: ["random", "interval"],
      required: true,
    },

    totalRows: {
      type: Number,
      required: true,
      min: 0,
    },

    selectedRows: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["completed", "failed"],
      default: "completed",
      required: true,
    },

    files: {
      original: {
        type: String,
        default: null,
      },
      marked: {
        type: String,
        default: null,
      },
      selected: {
        type: String,
        default: null,
      },
    },

    filesDeleted: {
      type: Boolean,
      default: false,
    },

    filesDeletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model( "ProcessHistory", processHistorySchema );