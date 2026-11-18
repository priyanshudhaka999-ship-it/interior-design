const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true,
    },
    deliverables: {
      type: [String],
      validate: [(arr) => arr.length > 0, 'At least one key deliverable is required'],
    },
    estimatedTimeline: {
      type: String,
      default: '6 - 14 Weeks',
      trim: true,
    },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, default: '' },
      alt: { type: String, default: '' },
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
