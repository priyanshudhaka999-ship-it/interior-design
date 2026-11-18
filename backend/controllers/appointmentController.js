const { validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');
const WebsiteSettings = require('../models/WebsiteSettings');
const {
  isPastDateInTimezone,
  getDayOfWeekFromDateString,
  hasSlotConflict,
  generateBookingReference,
} = require('../utils/bookingUtils');

const getBookingSettings = async () => {
  let settings = await WebsiteSettings.findOne({ singletonKey: 'default_settings' });
  if (!settings) {
    settings = await WebsiteSettings.create({ singletonKey: 'default_settings' });
  }
  return settings.bookingConfig;
};

// GET /api/appointments/availability?date=YYYY-MM-DD
const getAvailableSlots = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400);
      throw new Error('Please provide a valid date in YYYY-MM-DD format');
    }

    const bookingConfig = await getBookingSettings();
    const {
      timezone,
      availableDaysOfWeek,
      availableTimeSlots,
      blockedDates,
      defaultDurationMinutes,
      bufferTimeMinutes,
    } = bookingConfig;

    if (isPastDateInTimezone(date, timezone)) {
      return res.status(200).json({
        success: true,
        date,
        timezone,
        isDateAvailable: false,
        reason: 'Past dates cannot be booked.',
        slots: [],
      });
    }

    if (blockedDates.includes(date)) {
      return res.status(200).json({
        success: true,
        date,
        timezone,
        isDateAvailable: false,
        reason: 'Studio is closed for private site handovers on this date.',
        slots: [],
      });
    }

    const dayOfWeek = getDayOfWeekFromDateString(date);
    if (!availableDaysOfWeek.includes(dayOfWeek)) {
      return res.status(200).json({
        success: true,
        date,
        timezone,
        isDateAvailable: false,
        reason: 'Consultations are not scheduled on this day of the week.',
        slots: [],
      });
    }

    const existingAppointments = await Appointment.find({
      preferredDate: date,
      status: { $in: ['pending', 'confirmed'] },
    });

    const slots = availableTimeSlots.map((slot) => {
      const { conflict } = hasSlotConflict(
        slot,
        defaultDurationMinutes,
        bufferTimeMinutes,
        existingAppointments
      );
      return {
        time: slot,
        available: !conflict,
      };
    });

    res.status(200).json({
      success: true,
      date,
      timezone,
      durationMinutes: defaultDurationMinutes,
      bufferMinutes: bufferTimeMinutes,
      isDateAvailable: true,
      slots,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/appointments (Public Booking Request)
const createAppointment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array().map((e) => e.msg).join(', '));
    }

    const {
      consultationType,
      preferredDate,
      timeSlot,
      clientName,
      email,
      phone,
      projectType,
      location,
      requirements,
    } = req.body;

    const bookingConfig = await getBookingSettings();
    const {
      timezone,
      availableDaysOfWeek,
      availableTimeSlots,
      blockedDates,
      defaultDurationMinutes,
      bufferTimeMinutes,
    } = bookingConfig;

    if (isPastDateInTimezone(preferredDate, timezone)) {
      res.status(400);
      throw new Error('Cannot book a consultation in the past.');
    }

    if (blockedDates.includes(preferredDate)) {
      res.status(400);
      throw new Error('Selected date is unavailable for studio consultations.');
    }

    const dayOfWeek = getDayOfWeekFromDateString(preferredDate);
    if (!availableDaysOfWeek.includes(dayOfWeek)) {
      res.status(400);
      throw new Error('Studio does not hold consultations on the selected day of the week.');
    }

    if (!availableTimeSlots.includes(timeSlot)) {
      res.status(400);
      throw new Error('Selected time slot is outside configured consultation hours.');
    }

    const existingForDate = await Appointment.find({
      preferredDate,
      status: { $in: ['pending', 'confirmed'] },
    });

    const { conflict } = hasSlotConflict(
      timeSlot,
      defaultDurationMinutes,
      bufferTimeMinutes,
      existingForDate
    );

    if (conflict) {
      res.status(409);
      throw new Error(
        'This time slot (or an adjacent buffer window) has just been reserved. Please choose another available slot.'
      );
    }

    const bookingReference = generateBookingReference();

    const appointment = await Appointment.create({
      bookingReference,
      consultationType,
      preferredDate,
      timeSlot,
      durationMinutes: defaultDurationMinutes,
      bufferMinutes: bufferTimeMinutes,
      timezone,
      clientName,
      email,
      phone,
      projectType,
      location,
      requirements,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Consultation request received. Our studio director will confirm shortly.',
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/appointments (Admin)
const getAllAppointments = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status && status !== 'all' ? { status } : {};
    const appointments = await Appointment.find(filter).sort({
      preferredDate: 1,
      timeSlot: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/appointments/:id (Admin: confirm, reject/cancel, complete, reschedule)
const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      res.status(404);
      throw new Error('Appointment not found');
    }

    const nextDate = req.body.preferredDate || appointment.preferredDate;
    const nextSlot = req.body.timeSlot || appointment.timeSlot;
    const nextStatus = req.body.status || appointment.status;

    if (['pending', 'confirmed'].includes(nextStatus)) {
      const bookingConfig = await getBookingSettings();
      const others = await Appointment.find({
        _id: { $ne: appointment._id },
        preferredDate: nextDate,
        status: { $in: ['pending', 'confirmed'] },
      });

      const { conflict, conflictingAppointment } = hasSlotConflict(
        nextSlot,
        appointment.durationMinutes || bookingConfig.defaultDurationMinutes,
        appointment.bufferMinutes || bookingConfig.bufferTimeMinutes,
        others
      );

      if (conflict) {
        res.status(409);
        throw new Error(
          `Scheduling conflict with appointment ${conflictingAppointment.bookingReference} (${conflictingAppointment.clientName} at ${conflictingAppointment.timeSlot}).`
        );
      }
    }

    appointment.preferredDate = nextDate;
    appointment.timeSlot = nextSlot;
    appointment.status = nextStatus;
    if (req.body.adminNotes !== undefined) {
      appointment.adminNotes = req.body.adminNotes;
    }
    if (req.body.consultationType) {
      appointment.consultationType = req.body.consultationType;
    }

    await appointment.save();

    res.status(200).json({
      success: true,
      message: `Appointment ${appointment.bookingReference} updated to ${appointment.status}`,
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAvailableSlots,
  createAppointment,
  getAllAppointments,
  updateAppointment,
};
