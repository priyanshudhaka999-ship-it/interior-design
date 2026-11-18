const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    consultationType: {
      type: String,
      required: [true, 'Consultation type is required'],
      enum: [
        'Initial Architectural Discovery (60 min)',
        'Full Residential Design Consultation (90 min)',
        'Commercial & Hospitality Spatial Brief (90 min)',
        'Kitchen & Millwork Bespoke Planning (60 min)',
        'Renovation Feasibility & Site Review (90 min)',
      ],
    },
    preferredDate: {
      type: String, // Stored as YYYY-MM-DD in studio timezone for deterministic slot locking
      required: [true, 'Preferred date (YYYY-MM-DD) is required'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'],
      index: true,
    },
    timeSlot: {
      type: String, // e.g., "10:30"
      required: [true, 'Preferred time slot is required'],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time slot must be in HH:mm format'],
    },
    durationMinutes: {
      type: Number,
      default: 60,
    },
    bufferMinutes: {
      type: Number,
      default: 30,
    },
    timezone: {
      type: String,
      default: 'Asia/Kolkata',
    },
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Client email is required'],
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
      enum: [
        'Residential',
        'Commercial',
        'Kitchen',
        'Living Room',
        'Bedroom',
        'Office',
        'Renovation',
        'Space Planning',
      ],
    },
    location: {
      type: String,
      required: [true, 'Project location is required'],
      trim: true,
      maxlength: 140,
    },
    requirements: {
      type: String,
      required: [true, 'Project brief and requirements are required'],
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
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

// Prevent duplicate active bookings for the same date and timeSlot
appointmentSchema.index(
  { preferredDate: 1, timeSlot: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ['pending', 'confirmed'] } },
  }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
