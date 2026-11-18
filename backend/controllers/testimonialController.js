const { validationResult } = require('express-validator');
const Testimonial = require('../models/Testimonial');
const { deleteFromCloudinary } = require('../config/cloudinary');

// GET /api/testimonials
const getTestimonials = async (req, res, next) => {
  try {
    const filter = req.query.includeUnpublished === 'true' && req.admin ? {} : { published: true };
    const testimonials = await Testimonial.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/testimonials (Admin)
const createTestimonial = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array().map((e) => e.msg).join(', '));
    }

    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Testimonial added',
      testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/testimonials/:id (Admin)
const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      res.status(404);
      throw new Error('Testimonial not found');
    }

    const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Testimonial updated',
      testimonial: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/testimonials/:id (Admin)
const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      res.status(404);
      throw new Error('Testimonial not found');
    }

    if (testimonial.clientPhoto?.publicId) {
      await deleteFromCloudinary(testimonial.clientPhoto.publicId);
    }

    await testimonial.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Testimonial deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
