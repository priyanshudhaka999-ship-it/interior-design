const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: 30,
    },
    projectType: {
      type: String,
      required: [true, 'Project type is required'],
      trim: true,
    },
    budgetRange: {
      type: String,
      required: [true, 'Estimated budget range is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Project location is required'],
      trim: true,
      maxlength: 140,
    },
    message: {
      type: String,
      required: [true, 'Enquiry message is required'],
      trim: true,
      maxlength: 2500,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_progress', 'completed'],
      default: 'new',
      index: true,
    },
    adminNotes: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

enquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
