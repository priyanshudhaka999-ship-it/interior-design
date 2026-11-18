const { validationResult } = require('express-validator');
const Service = require('../models/Service');
const { deleteFromCloudinary } = require('../config/cloudinary');

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// GET /api/services
const getServices = async (req, res, next) => {
  try {
    const filter = req.query.includeUnpublished === 'true' && req.admin ? {} : { published: true };
    const services = await Service.find(filter).sort({ displayOrder: 1, createdAt: 1 });
    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/services (Admin)
const createService = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array().map((e) => e.msg).join(', '));
    }

    const payload = { ...req.body };
    payload.slug = payload.slug ? slugify(payload.slug) : slugify(payload.title);

    const service = await Service.create(payload);
    res.status(201).json({
      success: true,
      message: 'Service added',
      service,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/services/:id (Admin)
const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Service updated',
      service: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/services/:id (Admin)
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404);
      throw new Error('Service not found');
    }

    if (service.image?.publicId) {
      await deleteFromCloudinary(service.image.publicId);
    }

    await service.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Service removed',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService,
};
