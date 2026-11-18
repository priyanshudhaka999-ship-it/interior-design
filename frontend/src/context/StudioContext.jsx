import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import {
  INITIAL_SETTINGS,
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_TESTIMONIALS,
  INITIAL_APPOINTMENTS,
  INITIAL_ENQUIRIES,
  INITIAL_MEDIA,
} from '../data/initialStudioData';

const StudioContext = createContext(null);

const safeLoad = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const safeSave = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors
  }
};

const parseTimeToMinutes = (hhmm) => {
  const [h, m] = String(hhmm).split(':').map(Number);
  return h * 60 + m;
};

export const StudioProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => safeLoad('av_settings', INITIAL_SETTINGS));
  const [projects, setProjects] = useState(() => safeLoad('av_projects', INITIAL_PROJECTS));
  const [services, setServices] = useState(() => safeLoad('av_services', INITIAL_SERVICES));
  const [testimonials, setTestimonials] = useState(() =>
    safeLoad('av_testimonials', INITIAL_TESTIMONIALS)
  );
  const [appointments, setAppointments] = useState(() =>
    safeLoad('av_appointments', INITIAL_APPOINTMENTS)
  );
  const [enquiries, setEnquiries] = useState(() => safeLoad('av_enquiries', INITIAL_ENQUIRIES));
  const [mediaAssets, setMediaAssets] = useState(() => safeLoad('av_media', INITIAL_MEDIA));
  const [adminUser, setAdminUser] = useState(() => safeLoad('av_admin_user', null));
  const [loading, setLoading] = useState(false);

  // Sync with live Express API when backend is reachable
  useEffect(() => {
    let mounted = true;
    const fetchInitialData = async () => {
      try {
        const [projRes, srvRes, testRes, setRes] = await Promise.all([
          api.get('/projects'),
          api.get('/services'),
          api.get('/testimonials'),
          api.get('/settings'),
        ]);
        if (!mounted) return;
        if (projRes.data?.projects?.length) setProjects(projRes.data.projects);
        if (srvRes.data?.services?.length) setServices(srvRes.data.services);
        if (testRes.data?.testimonials?.length) setTestimonials(testRes.data.testimonials);
        if (setRes.data?.settings) setSettings(setRes.data.settings);
      } catch {
        // Fallback seamlessly to local state when running frontend standalone
      }
    };
    fetchInitialData();

    const handleSessionExpired = () => {
      setAdminUser(null);
      safeSave('av_admin_user', null);
      toast.error('Your session has expired. Please sign in again.');
    };
    window.addEventListener('atelier:session-expired', handleSessionExpired);
    return () => {
      mounted = false;
      window.removeEventListener('atelier:session-expired', handleSessionExpired);
    };
  }, []);

  useEffect(() => safeSave('av_settings', settings), [settings]);
  useEffect(() => safeSave('av_projects', projects), [projects]);
  useEffect(() => safeSave('av_services', services), [services]);
  useEffect(() => safeSave('av_testimonials', testimonials), [testimonials]);
  useEffect(() => safeSave('av_appointments', appointments), [appointments]);
  useEffect(() => safeSave('av_enquiries', enquiries), [enquiries]);
  useEffect(() => safeSave('av_media', mediaAssets), [mediaAssets]);

  // Conflict check helper factoring in duration + buffer time
  const checkSlotAvailability = useCallback(
    (dateStr, slotTime, excludeAppointmentId = null) => {
      const cfg = settings.bookingConfig || INITIAL_SETTINGS.bookingConfig;
      const duration = Number(cfg.defaultDurationMinutes || 60);
      const buffer = Number(cfg.bufferTimeMinutes || 30);
      const startMin = parseTimeToMinutes(slotTime);
      const endMin = startMin + duration + buffer;

      for (const appt of appointments) {
        if (excludeAppointmentId && appt._id === excludeAppointmentId) continue;
        if (appt.preferredDate !== dateStr) continue;
        if (!['pending', 'confirmed'].includes(appt.status)) continue;

        const exStart = parseTimeToMinutes(appt.timeSlot);
        const exEnd =
          exStart +
          Number(appt.durationMinutes || duration) +
          Number(appt.bufferMinutes || buffer);

        if (startMin < exEnd && exStart < endMin) {
          return { available: false, conflictingAppointment: appt };
        }
      }
      return { available: true, conflictingAppointment: null };
    },
    [appointments, settings]
  );

  // Admin Login
  const loginAdmin = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setAdminUser(data.admin);
      safeSave('av_admin_user', data.admin);
      return { success: true };
    } catch (err) {
      // Allow local demo authentication when backend server is not running
      const storedPass = safeLoad('av_admin_pass_hash', 'AtelierVera@2026');
      if (
        email.toLowerCase().trim() === 'admin@ateliervera.com' &&
        password === storedPass
      ) {
        const demoAdmin = {
          id: 'admin-1',
          name: 'Elena Rostova',
          email: 'admin@ateliervera.com',
          role: 'superadmin',
        };
        setAdminUser(demoAdmin);
        safeSave('av_admin_user', demoAdmin);
        return { success: true };
      }
      const message =
        err.response?.data?.message || 'Invalid administrator email or password.';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logoutAdmin = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore network error on standalone logout
    }
    setAdminUser(null);
    safeSave('av_admin_user', null);
    toast.success('Signed out of Studio Admin Portal.');
  };

  const changeAdminPassword = async (currentPassword, newPassword) => {
    try {
      await api.put('/auth/password', { currentPassword, newPassword });
      toast.success('Administrator password updated.');
      return { success: true };
    } catch {
      const storedPass = safeLoad('av_admin_pass_hash', 'AtelierVera@2026');
      if (currentPassword !== storedPass) {
        return { success: false, message: 'Current password is incorrect.' };
      }
      safeSave('av_admin_pass_hash', newPassword);
      toast.success('Administrator password updated.');
      return { success: true };
    }
  };

  // Public & Admin Booking creation with conflict prevention
  const submitAppointment = async (payload) => {
    try {
      const { data } = await api.post('/appointments', payload);
      setAppointments((prev) => [data.appointment, ...prev]);
      return { success: true, appointment: data.appointment };
    } catch (err) {
      if (err.response) {
        return {
          success: false,
          message: err.response.data?.message || 'Unable to book selected slot.',
        };
      }
      // Local fallback validation & conflict check
      const check = checkSlotAvailability(payload.preferredDate, payload.timeSlot);
      if (!check.available) {
        return {
          success: false,
          message:
            'This time slot (or adjacent buffer window) is already reserved. Please select another time slot.',
        };
      }
      const stamp = Date.now().toString(36).toUpperCase().slice(-4);
      const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
      const newAppt = {
        _id: `appt-${Date.now()}`,
        bookingReference: `AV-${stamp}-${rand}`,
        ...payload,
        durationMinutes: settings.bookingConfig?.defaultDurationMinutes || 60,
        bufferMinutes: settings.bookingConfig?.bufferTimeMinutes || 30,
        timezone: settings.bookingConfig?.timezone || 'Asia/Kolkata',
        status: 'pending',
        adminNotes: '',
        createdAt: new Date().toISOString(),
      };
      setAppointments((prev) => [newAppt, ...prev]);
      return { success: true, appointment: newAppt };
    }
  };

  const updateAppointmentItem = async (id, updates) => {
    try {
      const { data } = await api.put(`/appointments/${id}`, updates);
      setAppointments((prev) => prev.map((a) => (a._id === id ? data.appointment : a)));
      return { success: true };
    } catch (err) {
      if (err.response) {
        return { success: false, message: err.response.data?.message };
      }
      const target = appointments.find((a) => a._id === id);
      if (!target) return { success: false, message: 'Appointment not found' };
      const nextDate = updates.preferredDate || target.preferredDate;
      const nextSlot = updates.timeSlot || target.timeSlot;
      const nextStatus = updates.status || target.status;

      if (['pending', 'confirmed'].includes(nextStatus)) {
        const check = checkSlotAvailability(nextDate, nextSlot, id);
        if (!check.available) {
          return {
            success: false,
            message: `Conflict detected with booking ${check.conflictingAppointment.bookingReference} (${check.conflictingAppointment.timeSlot}).`,
          };
        }
      }
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, ...updates } : a))
      );
      return { success: true };
    }
  };

  // Enquiries
  const submitEnquiry = async (payload) => {
    try {
      const { data } = await api.post('/enquiries', payload);
      setEnquiries((prev) => [data.enquiry, ...prev]);
      return { success: true };
    } catch {
      const newEnq = {
        _id: `enq-${Date.now()}`,
        ...payload,
        status: 'new',
        adminNotes: '',
        createdAt: new Date().toISOString(),
      };
      setEnquiries((prev) => [newEnq, ...prev]);
      return { success: true };
    }
  };

  const updateEnquiryItem = async (id, updates) => {
    try {
      const { data } = await api.put(`/enquiries/${id}`, updates);
      setEnquiries((prev) => prev.map((e) => (e._id === id ? data.enquiry : e)));
    } catch {
      setEnquiries((prev) => prev.map((e) => (e._id === id ? { ...e, ...updates } : e)));
    }
  };

  const deleteEnquiryItem = async (id) => {
    try {
      await api.delete(`/enquiries/${id}`);
    } catch {
      // fallback
    }
    setEnquiries((prev) => prev.filter((e) => e._id !== id));
  };

  // Projects CRUD
  const saveProjectItem = async (projectData, editingId = null) => {
    const slug =
      projectData.slug ||
      projectData.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-');
    const normalized = { ...projectData, slug };

    try {
      if (editingId) {
        const { data } = await api.put(`/projects/${editingId}`, normalized);
        setProjects((prev) => prev.map((p) => (p._id === editingId ? data.project : p)));
      } else {
        const { data } = await api.post('/projects', normalized);
        setProjects((prev) => [data.project, ...prev]);
      }
    } catch {
      if (editingId) {
        setProjects((prev) =>
          prev.map((p) => (p._id === editingId ? { ...p, ...normalized } : p))
        );
      } else {
        setProjects((prev) => [{ _id: `proj-${Date.now()}`, ...normalized }, ...prev]);
      }
    }
  };

  const deleteProjectItem = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
    } catch {
      // fallback
    }
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  // Services CRUD
  const saveServiceItem = async (serviceData, editingId = null) => {
    const slug =
      serviceData.slug ||
      serviceData.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-');
    const normalized = { ...serviceData, slug };

    try {
      if (editingId) {
        const { data } = await api.put(`/services/${editingId}`, normalized);
        setServices((prev) => prev.map((s) => (s._id === editingId ? data.service : s)));
      } else {
        const { data } = await api.post('/services', normalized);
        setServices((prev) => [...prev, data.service]);
      }
    } catch {
      if (editingId) {
        setServices((prev) =>
          prev.map((s) => (s._id === editingId ? { ...s, ...normalized } : s))
        );
      } else {
        setServices((prev) => [...prev, { _id: `srv-${Date.now()}`, ...normalized }]);
      }
    }
  };

  const deleteServiceItem = async (id) => {
    try {
      await api.delete(`/services/${id}`);
    } catch {
      // fallback
    }
    setServices((prev) => prev.filter((s) => s._id !== id));
  };

  // Testimonials CRUD
  const saveTestimonialItem = async (itemData, editingId = null) => {
    try {
      if (editingId) {
        const { data } = await api.put(`/testimonials/${editingId}`, itemData);
        setTestimonials((prev) =>
          prev.map((t) => (t._id === editingId ? data.testimonial : t))
        );
      } else {
        const { data } = await api.post('/testimonials', itemData);
        setTestimonials((prev) => [data.testimonial, ...prev]);
      }
    } catch {
      if (editingId) {
        setTestimonials((prev) =>
          prev.map((t) => (t._id === editingId ? { ...t, ...itemData } : t))
        );
      } else {
        setTestimonials((prev) => [{ _id: `test-${Date.now()}`, ...itemData }, ...prev]);
      }
    }
  };

  const deleteTestimonialItem = async (id) => {
    try {
      await api.delete(`/testimonials/${id}`);
    } catch {
      // fallback
    }
    setTestimonials((prev) => prev.filter((t) => t._id !== id));
  };

  // Website Settings update
  const saveWebsiteSettings = async (nextSettings) => {
    try {
      const { data } = await api.put('/settings', nextSettings);
      setSettings(data.settings);
    } catch {
      setSettings(nextSettings);
    }
  };

  // Media Library Upload & Delete
  const uploadMediaItem = async (file, meta) => {
    const formData = new FormData();
    if (file) formData.append('images', file);
    if (meta?.title) formData.append('title', meta.title);
    if (meta?.category) formData.append('category', meta.category);

    try {
      const { data } = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMediaAssets((prev) => [...data.assets, ...prev]);
      return data.assets[0];
    } catch {
      const newAsset = {
        _id: `med-${Date.now()}`,
        title: meta.title || 'Uploaded Architectural Image',
        url: meta.url,
        publicId: `atelier-vera/upload-${Date.now().toString(36)}`,
        category: meta.category || 'Portfolio',
        format: 'jpg',
        bytes: file?.size || 285000,
      };
      setMediaAssets((prev) => [newAsset, ...prev]);
      return newAsset;
    }
  };

  const deleteMediaItem = async (id) => {
    try {
      await api.delete(`/media/${id}`);
    } catch {
      // fallback
    }
    setMediaAssets((prev) => prev.filter((m) => m._id !== id));
  };

  return (
    <StudioContext.Provider
      value={{
        settings,
        projects,
        services,
        testimonials,
        appointments,
        enquiries,
        mediaAssets,
        adminUser,
        loading,
        checkSlotAvailability,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        submitAppointment,
        updateAppointmentItem,
        submitEnquiry,
        updateEnquiryItem,
        deleteEnquiryItem,
        saveProjectItem,
        deleteProjectItem,
        saveServiceItem,
        deleteServiceItem,
        saveTestimonialItem,
        deleteTestimonialItem,
        saveWebsiteSettings,
        uploadMediaItem,
        deleteMediaItem,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => useContext(StudioContext);
