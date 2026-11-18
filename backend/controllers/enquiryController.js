const { validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');

// POST /api/enquiries (Public)
const createEnquiry = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array().map((e) => e.msg).join(', '));
    }

    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Thank you for your enquiry. Our senior design team will respond within 24 business hours.',
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/enquiries (Admin)
const getEnquiries = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }
    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name: regex },
        { email: regex },
        { location: regex },
        { projectType: regex },
        { message: regex },
      ];
    }

    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/enquiries/:id (Admin)
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      res.status(404);
      throw new Error('Enquiry not found');
    }

    if (req.body.status) enquiry.status = req.body.status;
    if (req.body.adminNotes !== undefined) enquiry.adminNotes = req.body.adminNotes;

    await enquiry.save();
    res.status(200).json({
      success: true,
      message: 'Enquiry status updated',
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/enquiries/:id (Admin)
const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      res.status(404);
      throw new Error('Enquiry not found');
    }

    await enquiry.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Enquiry deleted permanently',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};
