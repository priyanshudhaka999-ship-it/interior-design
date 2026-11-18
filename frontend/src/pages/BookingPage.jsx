import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useStudio } from '../context/StudioContext';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { PageContainer } from '../components/common/EditorialPrimitives';

const CONSULTATION_TYPES = [
  'Initial Architectural Discovery (60 min)',
  'Full Residential Design Consultation (90 min)',
  'Commercial & Hospitality Spatial Brief (90 min)',
  'Kitchen & Millwork Bespoke Planning (60 min)',
  'Renovation Feasibility & Site Review (90 min)',
];

const PROJECT_TYPES = [
  'Residential',
  'Commercial',
  'Kitchen',
  'Living Room',
  'Bedroom',
  'Office',
  'Renovation',
  'Space Planning',
];

const BookingPage = () => {
  const { settings, checkSlotAvailability, submitAppointment } = useStudio();
  const [searchParams] = useSearchParams();

  const minDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const [formData, setFormData] = useState({
    consultationType: CONSULTATION_TYPES[0],
    preferredDate: '2026-11-24',
    timeSlot: '',
    clientName: '',
    email: '',
    phone: '',
    projectType: searchParams.get('service')?.includes('Kitchen')
      ? 'Kitchen'
      : 'Residential',
    location: '',
    requirements: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    document.title = `Book a Consultation — ${settings.studioName || 'Atelier Vera'}`;
  }, [settings.studioName]);

  const bookingConfig = settings.bookingConfig || {
    timezone: 'Asia/Kolkata',
    availableDaysOfWeek: [1, 2, 3, 4, 5, 6],
    availableTimeSlots: ['10:00', '11:30', '14:00', '15:30', '17:00'],
    blockedDates: [],
    defaultDurationMinutes: 60,
    bufferTimeMinutes: 30,
  };

  const dateAvailability = useMemo(() => {
    const dateStr = formData.preferredDate;
    if (!dateStr) return { valid: false, reason: 'Please select a date.', slots: [] };

    const todayStr = new Date().toISOString().split('T')[0];
    if (dateStr < todayStr) {
      return {
        valid: false,
        reason: 'Past dates cannot be booked. Please choose an upcoming date.',
        slots: [],
      };
    }

    if ((bookingConfig.blockedDates || []).includes(dateStr)) {
      return {
        valid: false,
        reason: 'The studio is closed for site handovers on this date.',
        slots: [],
      };
    }

    const [y, m, d] = dateStr.split('-').map(Number);
    const dayOfWeek = new Date(Date.UTC(y, m - 1, d, 12, 0, 0)).getUTCDay();
    if (!(bookingConfig.availableDaysOfWeek || [1, 2, 3, 4, 5, 6]).includes(dayOfWeek)) {
      return {
        valid: false,
        reason: 'Consultations are held Monday through Saturday. The studio is closed on Sundays.',
        slots: [],
      };
    }

    const slots = (bookingConfig.availableTimeSlots || []).map((slot) => {
      const check = checkSlotAvailability(dateStr, slot);
      return {
        time: slot,
        available: check.available,
      };
    });

    return { valid: true, reason: '', slots };
  }, [formData.preferredDate, bookingConfig, checkSlotAvailability]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dateAvailability.valid) {
      toast.error(dateAvailability.reason);
      return;
    }
    if (!formData.timeSlot) {
      toast.error('Please choose an available consultation time slot in Step 02.');
      return;
    }
    if (
      !formData.clientName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.location.trim() ||
      !formData.requirements.trim()
    ) {
      toast.error('Please fill in all required contact and project details.');
      return;
    }

    setSubmitting(true);
    const result = await submitAppointment(formData);
    setSubmitting(false);

    if (result.success) {
      setConfirmedBooking(result.appointment);
      toast.success(`Consultation reserved (${result.appointment.bookingReference})`);
    } else {
      toast.error(result.message || 'Selected slot is unavailable.');
    }
  };

  if (confirmedBooking) {
    return (
      <div className="bg-[#F8F7F3] text-[#292824] py-20 lg:py-28">
        <PageContainer>
          <div className="max-w-2xl mx-auto bg-[#EFEBE3] p-10 sm:p-14 space-y-8">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.12em] text-[#777C61]">
                Appointment Request Confirmed
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#292824]">
                Thank You, {confirmedBooking.clientName}.
              </h1>
              <p className="text-sm text-[#77746D] leading-relaxed">
                Your time slot has been locked in our studio calendar. Please retain your booking reference below.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-y border-[#DEDAD1] py-6 text-sm">
              <div>
                <p className="text-xs text-[#77746D]">Booking Reference</p>
                <p className="font-mono text-lg text-[#292824] mt-1">
                  {confirmedBooking.bookingReference}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#77746D]">Date & Time</p>
                <p className="text-[#292824] mt-1">
                  {confirmedBooking.preferredDate} at {confirmedBooking.timeSlot} (
                  {confirmedBooking.timezone})
                </p>
              </div>
              <div>
                <p className="text-xs text-[#77746D]">Format</p>
                <p className="text-[#292824] mt-1">{confirmedBooking.consultationType}</p>
              </div>
              <div>
                <p className="text-xs text-[#77746D]">Status</p>
                <p className="text-[#777C61] capitalize mt-1">{confirmedBooking.status}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => {
                  setConfirmedBooking(null);
                  setFormData((prev) => ({ ...prev, timeSlot: '' }));
                }}
                className="px-6 py-3 border border-[#292824] text-sm text-[#292824] hover:bg-[#F8F7F3]"
              >
                Schedule Another Session
              </button>
              <Link
                to="/projects"
                className="px-6 py-3 bg-[#292824] text-[#F8F7F3] text-sm"
              >
                Explore Selected Works
              </Link>
            </div>
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F7F3] text-[#292824] pt-14 sm:pt-20 pb-28 lg:pb-36">
      <PageContainer className="space-y-16">
        <div className="max-w-3xl space-y-4">
          <RevealOnScroll variant="text">
            <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
              Private Appointments
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="heading" delay={0.05}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-[#292824] leading-[1.1]">
              Book a Consultation
            </h1>
          </RevealOnScroll>
          <RevealOnScroll variant="text" delay={0.1}>
            <p className="text-base text-[#77746D] leading-relaxed">
              Arrange a private architectural consultation in our studio or on site. All sessions are scheduled in {bookingConfig.timezone} with a {bookingConfig.bufferTimeMinutes}-minute buffer between appointments.
            </p>
          </RevealOnScroll>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16 border-t border-[#DEDAD1] pt-16">
          {/* STAGE 1 — CONSULTATION DETAILS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-1">
              <span className="text-xs text-[#777C61] tracking-[0.1em]">Step 01</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#292824]">
                Consultation Details
              </h2>
              <p className="text-sm text-[#77746D]">
                Select the nature and architectural typology of your project.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs text-[#77746D] mb-2">
                  Consultation Type *
                </label>
                <select
                  value={formData.consultationType}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, consultationType: e.target.value }))
                  }
                  className="w-full py-3 px-4 bg-[#EFEBE3]/60 border border-[#DEDAD1] text-sm text-[#292824] focus:outline-none focus:border-[#292824]"
                >
                  {CONSULTATION_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#77746D] mb-2">
                  Project Category *
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, projectType: e.target.value }))
                  }
                  className="w-full py-3 px-4 bg-[#EFEBE3]/60 border border-[#DEDAD1] text-sm text-[#292824] focus:outline-none focus:border-[#292824]"
                >
                  {PROJECT_TYPES.map((pt) => (
                    <option key={pt} value={pt}>
                      {pt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* STAGE 2 — DATE AND TIME */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-[#DEDAD1] pt-14">
            <div className="lg:col-span-4 space-y-1">
              <span className="text-xs text-[#777C61] tracking-[0.1em]">Step 02</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#292824]">
                Date & Time
              </h2>
              <p className="text-sm text-[#77746D]">
                Choose an available date and time slot ({bookingConfig.timezone}).
              </p>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div className="max-w-xs">
                <label className="block text-xs text-[#77746D] mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  min={minDateStr}
                  value={formData.preferredDate}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      preferredDate: e.target.value,
                      timeSlot: '',
                    }))
                  }
                  className="w-full py-3 px-4 bg-[#EFEBE3]/60 border border-[#DEDAD1] text-sm text-[#292824] focus:outline-none focus:border-[#292824]"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-[#77746D]">
                  Available Time Slots *
                </label>
                {!dateAvailability.valid ? (
                  <p className="text-sm text-[#777C61] bg-[#EFEBE3] p-4">
                    {dateAvailability.reason}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {dateAvailability.slots.map((slot) => {
                      const isSelected = formData.timeSlot === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() =>
                            setFormData((p) => ({ ...p, timeSlot: slot.time }))
                          }
                          className={`px-6 py-3 text-sm border transition-colors ${
                            !slot.available
                              ? 'border-[#DEDAD1] text-[#77746D]/50 line-through cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#292824] border-[#292824] text-[#F8F7F3]'
                              : 'bg-transparent border-[#DEDAD1] text-[#292824] hover:border-[#292824]'
                          }`}
                        >
                          {slot.time} {!slot.available ? '(Reserved)' : ''}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* STAGE 3 — YOUR CONTACT INFORMATION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-[#DEDAD1] pt-14">
            <div className="lg:col-span-4 space-y-1">
              <span className="text-xs text-[#777C61] tracking-[0.1em]">Step 03</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#292824]">
                Your Contact Information
              </h2>
              <p className="text-sm text-[#77746D]">
                Provide your coordinates and a brief overview of your property.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs text-[#77746D] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, clientName: e.target.value }))
                    }
                    placeholder="Mira & Rohan Deshmukh"
                    className="w-full pb-3 bg-transparent border-b border-[#DEDAD1] text-base text-[#292824] focus:outline-none focus:border-[#292824]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#77746D] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="client@domain.com"
                    className="w-full pb-3 bg-transparent border-b border-[#DEDAD1] text-base text-[#292824] focus:outline-none focus:border-[#292824]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs text-[#77746D] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+91 98200 00000"
                    className="w-full pb-3 bg-transparent border-b border-[#DEDAD1] text-base text-[#292824] focus:outline-none focus:border-[#292824]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#77746D] mb-2">
                    Site Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, location: e.target.value }))
                    }
                    placeholder="Bandra West, Mumbai"
                    className="w-full pb-3 bg-transparent border-b border-[#DEDAD1] text-base text-[#292824] focus:outline-none focus:border-[#292824]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#77746D] mb-2">
                  Project Overview & Requirements *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, requirements: e.target.value }))
                  }
                  placeholder="Describe your property, approximate square footage, and desired timeline..."
                  className="w-full p-4 bg-[#EFEBE3]/50 border border-[#DEDAD1] text-base text-[#292824] focus:outline-none focus:border-[#292824]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-10 py-4 bg-[#292824] text-[#F8F7F3] text-sm hover:bg-[#777C61] transition-colors disabled:opacity-50"
                >
                  {submitting
                    ? 'Confirming Slot...'
                    : formData.timeSlot
                    ? `Confirm Appointment (${formData.preferredDate} · ${formData.timeSlot})`
                    : 'Request Consultation'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </PageContainer>
    </div>
  );
};

export default BookingPage;
