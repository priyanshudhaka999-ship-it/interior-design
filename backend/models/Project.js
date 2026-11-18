const mongoose = require('mongoose');

const imageAssetSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, trim: true },
    publicId: { type: String, default: '' },
    alt: { type: String, default: '' },
    caption: { type: String, default: '' },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: 140,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: [
        'Residential',
        'Commercial',
        'Kitchen',
        'Living Room',
        'Bedroom',
        'Office',
        'Renovation',
      ],
      index: true,
    },
    location: {
      type: String,
      required: [true, 'Project location is required'],
      trim: true,
    },
    completionYear: {
      type: Number,
      required: [true, 'Completion year is required'],
      min: 1990,
      max: 2100,
    },
    areaSqFt: {
      type: String,
      default: '',
      trim: true,
    },
    leadDesigner: {
      type: String,
      default: 'Elena Rostova',
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short summary is required'],
      trim: true,
      maxlength: 320,
    },
    overview: {
      type: String,
      required: [true, 'Project overview is required'],
      trim: true,
    },
    designConcept: {
      type: String,
      required: [true, 'Design concept is required'],
      trim: true,
    },
    challenges: {
      type: String,
      required: [true, 'Project challenges description is required'],
      trim: true,
    },
    solutions: {
      type: String,
      required: [true, 'Architectural solutions description is required'],
      trim: true,
    },
    materialsPalette: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: imageAssetSchema,
      required: true,
    },
    gallery: {
      type: [imageAssetSchema],
      default: [],
    },
    beforeAfter: {
      enabled: { type: Boolean, default: false },
      beforeImage: { type: imageAssetSchema, default: null },
      afterImage: { type: imageAssetSchema, default: null },
      transformationSummary: { type: String, default: '', trim: true },
      structuralChanges: { type: [String], default: [] },
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
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

projectSchema.index({ published: 1, featured: -1, displayOrder: 1, completionYear: -1 });

module.exports = mongoose.model('Project', projectSchema);
