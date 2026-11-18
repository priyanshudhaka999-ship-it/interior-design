/**
 * Timezone-aware date validation and booking conflict helper utilities
 */

const parseTimeToMinutes = (hhmm) => {
  const [hours, minutes] = String(hhmm).split(':').map(Number);
  return hours * 60 + minutes;
};

const getCurrentDateStringInTimezone = (timezone = 'Asia/Kolkata') => {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(new Date()); // Returns YYYY-MM-DD
};

const isPastDateInTimezone = (dateStr, timezone = 'Asia/Kolkata') => {
  const todayStr = getCurrentDateStringInTimezone(timezone);
  return dateStr < todayStr;
};

const getDayOfWeekFromDateString = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  return utcDate.getUTCDay();
};

/**
 * Checks whether a candidate slot overlaps with any existing active appointment
 * factoring in appointment duration + studio buffer time.
 */
const hasSlotConflict = (
  candidateSlot,
  candidateDuration,
  bufferMinutes,
  existingAppointments
) => {
  const candidateStart = parseTimeToMinutes(candidateSlot);
  const candidateEnd = candidateStart + Number(candidateDuration || 60) + Number(bufferMinutes || 30);

  for (const appt of existingAppointments) {
    if (!['pending', 'confirmed'].includes(appt.status)) continue;
    const existingStart = parseTimeToMinutes(appt.timeSlot);
    const existingEnd =
      existingStart +
      Number(appt.durationMinutes || 60) +
      Number(appt.bufferMinutes || bufferMinutes || 30);

    // Overlap check: startA < endB && startB < endA
    if (candidateStart < existingEnd && existingStart < candidateEnd) {
      return {
        conflict: true,
        conflictingAppointment: appt,
      };
    }
  }

  return { conflict: false, conflictingAppointment: null };
};

const generateBookingReference = () => {
  const stamp = Date.now().toString(36).toUpperCase().slice(-4);
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AV-${stamp}-${rand}`;
};

module.exports = {
  parseTimeToMinutes,
  getCurrentDateStringInTimezone,
  isPastDateInTimezone,
  getDayOfWeekFromDateString,
  hasSlotConflict,
  generateBookingReference,
};
