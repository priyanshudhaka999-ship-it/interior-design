const Project = require('../models/Project');
const Enquiry = require('../models/Enquiry');
const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const { getCurrentDateStringInTimezone } = require('../utils/bookingUtils');

// GET /api/dashboard/overview (Admin)
const getDashboardOverview = async (req, res, next) => {
  try {
    const todayStr = getCurrentDateStringInTimezone('Asia/Kolkata');

    const [
      totalProjects,
      publishedProjects,
      totalServices,
      totalTestimonials,
      totalEnquiries,
      newEnquiriesCount,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      recentEnquiries,
      upcomingAppointments,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ published: true }),
      Service.countDocuments(),
      Testimonial.countDocuments(),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments({ status: 'confirmed' }),
      Appointment.countDocuments({ status: 'completed' }),
      Enquiry.find().sort({ createdAt: -1 }).limit(5),
      Appointment.find({
        preferredDate: { $gte: todayStr },
        status: { $in: ['pending', 'confirmed'] },
      })
        .sort({ preferredDate: 1, timeSlot: 1 })
        .limit(6),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalProjects,
        publishedProjects,
        totalServices,
        totalTestimonials,
        totalEnquiries,
        newEnquiriesCount,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
      },
      recentEnquiries,
      upcomingAppointments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardOverview };
