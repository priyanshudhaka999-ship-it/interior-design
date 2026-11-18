const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      maxlength: 100,
    },
    projectType: {
      type: String,
      required: [true, 'Project type is required'],
      trim: true,
      maxlength: 120,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    feedback: {
      type: String,
      required: [true, 'Client feedback quote is required'],
      trim: true,
      maxlength: 1000,
    },
    clientPhoto: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    isDemoContent: {
      type: Boolean,
      default: true,
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
