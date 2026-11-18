const mongoose = require('mongoose');

const mediaAssetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      default: 'Portfolio',
    },
    format: {
      type: String,
      default: 'jpg',
    },
    bytes: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 1600,
    },
    height: {
      type: Number,
      default: 1067,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MediaAsset', mediaAssetSchema);
