import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  MessageSquareQuote,
  CalendarClock,
  MailQuestion,
  Settings,
  Image as ImageIcon,
  UserCheck,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Search,
  ExternalLink,
  UploadCloud,
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import SmartImage from '../../components/common/SmartImage';
import ConfirmModal from '../../components/common/ConfirmModal';

const TABS = [
  { id: 'overview', label: '1. Overview', icon: LayoutDashboard },
  { id: 'projects', label: '2. Projects', icon: FolderKanban },
  { id: 'services', label: '3. Services', icon: Briefcase },
  { id: 'testimonials', label: '4. Testimonials', icon: MessageSquareQuote },
  { id: 'appointments', label: '5. Appointments', icon: CalendarClock },
  { id: 'enquiries', label: '6. Enquiries', icon: MailQuestion },
  { id: 'settings', label: '7. Content Settings', icon: Settings },
  { id: 'media', label: '8. Media (Cloudinary)', icon: ImageIcon },
  { id: 'profile', label: '9. Admin Profile', icon: UserCheck },
];

const CATEGORIES = [
  'Residential',
  'Commercial',
  'Kitchen',
  'Living Room',
  'Bedroom',
  'Office',
  'Renovation',
];

const AdminDashboardPage = () => {
  const {
    settings,
    projects,
    services,
    testimonials,
    appointments,
    enquiries,
    mediaAssets,
    adminUser,
    logoutAdmin,
    changeAdminPassword,
    saveProjectItem,
    deleteProjectItem,
    saveServiceItem,
    deleteServiceItem,
    saveTestimonialItem,
    deleteTestimonialItem,
    updateAppointmentItem,
    updateEnquiryItem,
    deleteEnquiryItem,
    saveWebsiteSettings,
    uploadMediaItem,
    deleteMediaItem,
  } = useStudio();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Confirmation modal state
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  // Project form state
  const emptyProject = {
    title: '',
    category: 'Residential',
    location: '',
    completionYear: 2026,
    areaSqFt: '3,200 sq. ft.',
    leadDesigner: 'Elena Rostova',
    shortDescription: '',
    overview: '',
    designConcept: '',
    challenges: '',
    solutions: '',
    materialsPaletteText: 'Honed Kota Stone, Hand-Troweled Lime Plaster, Reclaimed Burma Teak',
    coverImageUrl: '',
    galleryUrlsText: '',
    beforeAfterEnabled: false,
    beforeImageUrl: '',
    afterImageUrl: '',
    transformationSummary: '',
    featured: false,
    published: true,
  };
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Service form state
  const emptyService = {
    title: '',
    subtitle: '',
    description: '',
    deliverablesText: '',
    estimatedTimeline: '8 – 14 Weeks',
    imageUrl: '',
    displayOrder: services.length + 1,
    published: true,
  };
  const [serviceForm, setServiceForm] = useState(emptyService);
  const [editingServiceId, setEditingServiceId] = useState(null);

  // Testimonial form state
  const emptyTestimonial = {
    clientName: '',
    projectType: '',
    location: '',
    feedback: '',
    clientPhotoUrl: '',
    isDemoContent: false,
    published: true,
  };
  const [testimonialForm, setTestimonialForm] = useState(emptyTestimonial);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);

  // Appointment filter & reschedule state
  const [apptFilter, setApptFilter] = useState('all');
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlot, setRescheduleSlot] = useState('');

  // Enquiry filter & search state
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('all');
  const [enquirySearch, setEnquirySearch] = useState('');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);
  const [slotsText, setSlotsText] = useState(
    (settings.bookingConfig?.availableTimeSlots || []).join(', ')
  );

  // Media upload state
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaUrlInput, setMediaUrlInput] = useState('');
  const [mediaCategory, setMediaCategory] = useState('Portfolio');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Admin password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    document.title = `Admin Studio Portal — ${settings.studioName}`;
    if (!adminUser) {
      navigate('/admin/login', { replace: true });
    }
  }, [adminUser, navigate, settings.studioName]);

  useEffect(() => {
    setSettingsForm(settings);
    setSlotsText((settings.bookingConfig?.availableTimeSlots || []).join(', '));
  }, [settings]);

  if (!adminUser) return null;

  const pendingApptsCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedApptsCount = appointments.filter((a) => a.status === 'confirmed').length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  // Handlers for Projects
  const handleEditProject = (proj) => {
    setEditingProjectId(proj._id);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      location: proj.location,
      completionYear: proj.completionYear,
      areaSqFt: proj.areaSqFt || '',
      leadDesigner: proj.leadDesigner || 'Elena Rostova',
      shortDescription: proj.shortDescription,
      overview: proj.overview,
      designConcept: proj.designConcept,
      challenges: proj.challenges,
      solutions: proj.solutions,
      materialsPaletteText: (proj.materialsPalette || []).join(', '),
      coverImageUrl: proj.coverImage?.url || '',
      galleryUrlsText: (proj.gallery || []).map((g) => g.url).join('\n'),
      beforeAfterEnabled: Boolean(proj.beforeAfter?.enabled),
      beforeImageUrl: proj.beforeAfter?.beforeImage?.url || '',
      afterImageUrl: proj.beforeAfter?.afterImage?.url || '',
      transformationSummary: proj.beforeAfter?.transformationSummary || '',
      featured: Boolean(proj.featured),
      published: Boolean(proj.published),
    });
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title.trim() || !projectForm.coverImageUrl.trim()) {
      toast.error('Project title and cover image URL are required.');
      return;
    }

    const gallery = projectForm.galleryUrlsText
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean)
      .map((url, idx) => ({
        url,
        publicId: `atelier-vera/gallery-${idx}`,
        alt: `${projectForm.title} view ${idx + 1}`,
      }));

    const payload = {
      title: projectForm.title.trim(),
      category: projectForm.category,
      location: projectForm.location.trim(),
      completionYear: Number(projectForm.completionYear) || 2026,
      areaSqFt: projectForm.areaSqFt.trim(),
      leadDesigner: projectForm.leadDesigner.trim(),
      shortDescription: projectForm.shortDescription.trim(),
      overview: projectForm.overview.trim(),
      designConcept: projectForm.designConcept.trim(),
      challenges: projectForm.challenges.trim(),
      solutions: projectForm.solutions.trim(),
      materialsPalette: projectForm.materialsPaletteText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      coverImage: {
        url: projectForm.coverImageUrl.trim(),
        publicId: 'atelier-vera/cover',
        alt: projectForm.title.trim(),
      },
      gallery,
      beforeAfter: {
        enabled: projectForm.beforeAfterEnabled,
        beforeImage: projectForm.beforeImageUrl
          ? { url: projectForm.beforeImageUrl.trim(), alt: 'Before remodeling' }
          : null,
        afterImage: projectForm.afterImageUrl
          ? { url: projectForm.afterImageUrl.trim(), alt: 'After remodeling' }
          : null,
        transformationSummary: projectForm.transformationSummary.trim(),
        structuralChanges: ['Spatial Reconfiguration', 'Natural Daylight Optimization'],
      },
      featured: projectForm.featured,
      published: projectForm.published,
    };

    await saveProjectItem(payload, editingProjectId);
    toast.success(editingProjectId ? 'Project updated.' : 'New project published.');
    setEditingProjectId(null);
    setProjectForm(emptyProject);
  };

  // Handlers for Services
  const handleEditService = (srv) => {
    setEditingServiceId(srv._id);
    setServiceForm({
      title: srv.title,
      subtitle: srv.subtitle || '',
      description: srv.description,
      deliverablesText: (srv.deliverables || []).join('\n'),
      estimatedTimeline: srv.estimatedTimeline || '8 – 14 Weeks',
      imageUrl: srv.image?.url || '',
      displayOrder: srv.displayOrder || 1,
      published: Boolean(srv.published),
    });
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    const deliverables = serviceForm.deliverablesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!serviceForm.title.trim() || deliverables.length === 0) {
      toast.error('Service title and at least one deliverable are required.');
      return;
    }

    await saveServiceItem(
      {
        title: serviceForm.title.trim(),
        subtitle: serviceForm.subtitle.trim(),
        description: serviceForm.description.trim(),
        deliverables,
        estimatedTimeline: serviceForm.estimatedTimeline.trim(),
        image: {
          url:
            serviceForm.imageUrl.trim() ||
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
          alt: serviceForm.title.trim(),
        },
        displayOrder: Number(serviceForm.displayOrder) || 1,
        published: serviceForm.published,
      },
      editingServiceId
    );
    toast.success(editingServiceId ? 'Service updated.' : 'New service added.');
    setEditingServiceId(null);
    setServiceForm(emptyService);
  };

  // Handlers for Testimonials
  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    if (!testimonialForm.clientName.trim() || !testimonialForm.feedback.trim()) {
      toast.error('Client name and feedback quote are required.');
      return;
    }
    await saveTestimonialItem(
      {
        clientName: testimonialForm.clientName.trim(),
        projectType: testimonialForm.projectType.trim(),
        location: testimonialForm.location.trim(),
        feedback: testimonialForm.feedback.trim(),
        clientPhoto: {
          url: testimonialForm.clientPhotoUrl.trim(),
        },
        isDemoContent: testimonialForm.isDemoContent,
        published: testimonialForm.published,
      },
      editingTestimonialId
    );
    toast.success(editingTestimonialId ? 'Testimonial updated.' : 'Testimonial created.');
    setEditingTestimonialId(null);
    setTestimonialForm(emptyTestimonial);
  };

  // Handlers for Appointments
  const handleAppointmentStatus = async (id, status) => {
    const res = await updateAppointmentItem(id, { status });
    if (res.success) {
      toast.success(`Appointment marked as ${status}.`);
    } else {
      toast.error(res.message || 'Conflict detected.');
    }
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    if (!rescheduleTarget || !rescheduleDate || !rescheduleSlot) return;
    const res = await updateAppointmentItem(rescheduleTarget._id, {
      preferredDate: rescheduleDate,
      timeSlot: rescheduleSlot,
      status: 'confirmed',
    });
    if (res.success) {
      toast.success(`Rescheduled ${rescheduleTarget.bookingReference} to ${rescheduleDate} at ${rescheduleSlot}.`);
      setRescheduleTarget(null);
    } else {
      toast.error(res.message || 'Slot conflict prevented rescheduling.');
    }
  };

  // Handlers for Content Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const parsedSlots = slotsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(s));

    const updated = {
      ...settingsForm,
      bookingConfig: {
        ...settingsForm.bookingConfig,
        availableTimeSlots:
          parsedSlots.length > 0 ? parsedSlots : ['10:00', '11:30', '14:00', '15:30', '17:00'],
      },
    };
    await saveWebsiteSettings(updated);
    toast.success('Website settings and booking availability updated.');
  };

  // Handlers for Media Upload
  const handleMediaUpload = async (e) => {
    e.preventDefault();
    if (!mediaUrlInput.trim()) {
      toast.error('Provide an image URL or file to upload to Cloudinary.');
      return;
    }
    setUploadProgress(35);
    setTimeout(async () => {
      setUploadProgress(85);
      await uploadMediaItem(null, {
        title: mediaTitle.trim() || 'Studio Architectural Asset',
        url: mediaUrlInput.trim(),
        category: mediaCategory,
      });
      setUploadProgress(100);
      toast.success('Image uploaded and indexed in Cloudinary media library.');
      setMediaTitle('');
      setMediaUrlInput('');
      setTimeout(() => setUploadProgress(0), 600);
    }, 350);
  };

  const filteredAppointments =
    apptFilter === 'all'
      ? appointments
      : appointments.filter((a) => a.status === apptFilter);

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesStatus =
      enquiryStatusFilter === 'all' || enq.status === enquiryStatusFilter;
    const q = enquirySearch.trim().toLowerCase();
    const matchesQuery =
      !q ||
      enq.name.toLowerCase().includes(q) ||
      enq.email.toLowerCase().includes(q) ||
      enq.location.toLowerCase().includes(q) ||
      enq.projectType.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#292824]">
      {/* Top Admin Header Bar */}
      <div className="bg-[#EAE5DC] border-b border-[#DDD8CE] px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#777C61] font-semibold">
            {settings.studioName} — Executive Management Portal
          </p>
          <h1 className="font-serif text-xl sm:text-2xl text-[#292824]">
            Welcome, {adminUser.name} ({adminUser.email})
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-xs uppercase tracking-widest text-[#292824] hover:bg-[#FFFFFF] inline-flex items-center gap-1.5"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={logoutAdmin}
            className="px-4 py-2 bg-[#292824] text-[#F7F5F0] text-xs uppercase tracking-widest hover:bg-[#777C61] inline-flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-1.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-4 py-3 text-left text-xs uppercase tracking-[0.15em] flex items-center gap-3 border transition-colors ${
                  isActive
                    ? 'bg-[#292824] text-[#F7F5F0] border-[#292824] font-medium'
                    : 'bg-[#FFFFFF] text-[#77746D] border-[#DDD8CE] hover:bg-[#EAE5DC] hover:text-[#292824]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Main Workspace Panel */}
        <section className="lg:col-span-9 space-y-8">
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#FFFFFF] border border-[#DDD8CE] p-5">
                  <p className="text-xs uppercase tracking-widest text-[#77746D]">Total Projects</p>
                  <p className="font-serif text-3xl text-[#292824] mt-2">{projects.length}</p>
                  <p className="text-[11px] text-[#777C61] mt-1">
                    {projects.filter((p) => p.published).length} Published
                  </p>
                </div>
                <div className="bg-[#FFFFFF] border border-[#DDD8CE] p-5">
                  <p className="text-xs uppercase tracking-widest text-[#77746D]">Total Enquiries</p>
                  <p className="font-serif text-3xl text-[#292824] mt-2">{enquiries.length}</p>
                  <p className="text-[11px] text-[#777C61] mt-1">{newEnquiriesCount} New Unread</p>
                </div>
                <div className="bg-[#FFFFFF] border border-[#DDD8CE] p-5">
                  <p className="text-xs uppercase tracking-widest text-[#77746D]">Pending Bookings</p>
                  <p className="font-serif text-3xl text-[#292824] mt-2">{pendingApptsCount}</p>
                  <p className="text-[11px] text-[#77746D] mt-1">Awaiting Confirmation</p>
                </div>
                <div className="bg-[#FFFFFF] border border-[#DDD8CE] p-5">
                  <p className="text-xs uppercase tracking-widest text-[#77746D]">Confirmed Bookings</p>
                  <p className="font-serif text-3xl text-[#777C61] mt-2">{confirmedApptsCount}</p>
                  <p className="text-[11px] text-[#77746D] mt-1">Conflict-Locked</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-3">
                    <h2 className="font-serif text-xl">Upcoming Consultations</h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab('appointments')}
                      className="text-xs uppercase tracking-widest text-[#777C61] hover:underline"
                    >
                      Manage All →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {appointments.slice(0, 4).map((appt) => (
                      <div
                        key={appt._id}
                        className="p-3.5 bg-[#F7F5F0] border border-[#DDD8CE] flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <p className="font-medium text-[#292824]">
                            {appt.clientName} ({appt.bookingReference})
                          </p>
                          <p className="text-[#77746D]">
                            {appt.preferredDate} at {appt.timeSlot} · {appt.projectType}
                          </p>
                        </div>
                        <span className="px-2.5 py-1 uppercase tracking-wider bg-[#EAE5DC] border border-[#DDD8CE] text-[#292824]">
                          {appt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-3">
                    <h2 className="font-serif text-xl">Recent Project Enquiries</h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab('enquiries')}
                      className="text-xs uppercase tracking-widest text-[#777C61] hover:underline"
                    >
                      View Inbox →
                    </button>
                  </div>
                  <div className="space-y-3">
                    {enquiries.slice(0, 4).map((enq) => (
                      <div
                        key={enq._id}
                        className="p-3.5 bg-[#F7F5F0] border border-[#DDD8CE] space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[#292824]">{enq.name}</span>
                          <span className="uppercase tracking-widest text-[#777C61]">
                            {enq.status}
                          </span>
                        </div>
                        <p className="text-[#77746D]">
                          {enq.projectType} · {enq.location} · {enq.budgetRange}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. PROJECTS MANAGEMENT TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-8">
              <form
                onSubmit={handleSaveProject}
                className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 sm:p-8 space-y-5"
              >
                <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-3">
                  <h2 className="font-serif text-2xl">
                    {editingProjectId ? 'Edit Portfolio Project' : 'Create New Portfolio Project'}
                  </h2>
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectForm(emptyProject);
                      }}
                      className="text-xs uppercase tracking-widest text-[#77746D] hover:text-[#292824]"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))}
                      className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1">Category *</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm((p) => ({ ...p, category: e.target.value }))}
                      className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1">
                      Location & Year *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={projectForm.location}
                        onChange={(e) => setProjectForm((p) => ({ ...p, location: e.target.value }))}
                        className="w-2/3 px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                      />
                      <input
                        type="number"
                        required
                        value={projectForm.completionYear}
                        onChange={(e) =>
                          setProjectForm((p) => ({ ...p, completionYear: e.target.value }))
                        }
                        className="w-1/3 px-2 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">
                    Cover Photograph URL (Cloudinary / Architectural Source) *
                  </label>
                  <input
                    type="url"
                    required
                    value={projectForm.coverImageUrl}
                    onChange={(e) =>
                      setProjectForm((p) => ({ ...p, coverImageUrl: e.target.value }))
                    }
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">
                    Short Editorial Summary *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.shortDescription}
                    onChange={(e) =>
                      setProjectForm((p) => ({ ...p, shortDescription: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1">
                      Project Overview *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={projectForm.overview}
                      onChange={(e) => setProjectForm((p) => ({ ...p, overview: e.target.value }))}
                      className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1">
                      Design Concept *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={projectForm.designConcept}
                      onChange={(e) =>
                        setProjectForm((p) => ({ ...p, designConcept: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1">
                      Site Challenges *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={projectForm.challenges}
                      onChange={(e) =>
                        setProjectForm((p) => ({ ...p, challenges: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1">
                      Architectural Solutions *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={projectForm.solutions}
                      onChange={(e) => setProjectForm((p) => ({ ...p, solutions: e.target.value }))}
                      className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">
                    Gallery Image URLs (One URL per line)
                  </label>
                  <textarea
                    rows={2}
                    value={projectForm.galleryUrlsText}
                    onChange={(e) =>
                      setProjectForm((p) => ({ ...p, galleryUrlsText: e.target.value }))
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>

                <div className="bg-[#EAE5DC]/60 border border-[#DDD8CE] p-4 space-y-3">
                  <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold">
                    <input
                      type="checkbox"
                      checked={projectForm.beforeAfterEnabled}
                      onChange={(e) =>
                        setProjectForm((p) => ({ ...p, beforeAfterEnabled: e.target.checked }))
                      }
                    />
                    <span>Enable Before & After Comparison Showcase</span>
                  </label>
                  {projectForm.beforeAfterEnabled && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <input
                        type="url"
                        placeholder="Before Image URL"
                        value={projectForm.beforeImageUrl}
                        onChange={(e) =>
                          setProjectForm((p) => ({ ...p, beforeImageUrl: e.target.value }))
                        }
                        className="px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-xs"
                      />
                      <input
                        type="url"
                        placeholder="After Image URL"
                        value={projectForm.afterImageUrl}
                        onChange={(e) =>
                          setProjectForm((p) => ({ ...p, afterImageUrl: e.target.value }))
                        }
                        className="px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Transformation summary note"
                        value={projectForm.transformationSummary}
                        onChange={(e) =>
                          setProjectForm((p) => ({
                            ...p,
                            transformationSummary: e.target.value,
                          }))
                        }
                        className="px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-xs"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-6 text-xs uppercase tracking-widest">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={projectForm.featured}
                        onChange={(e) =>
                          setProjectForm((p) => ({ ...p, featured: e.target.checked }))
                        }
                      />
                      <span>Featured on Homepage</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={projectForm.published}
                        onChange={(e) =>
                          setProjectForm((p) => ({ ...p, published: e.target.checked }))
                        }
                      />
                      <span>Published</span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#292824] text-[#F7F5F0] text-xs uppercase tracking-widest hover:bg-[#777C61]"
                  >
                    {editingProjectId ? 'Save Project Changes' : 'Publish Project'}
                  </button>
                </div>
              </form>

              <div className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 space-y-4">
                <h3 className="font-serif text-xl">Portfolio Inventory ({projects.length})</h3>
                <div className="divide-y divide-[#DDD8CE]">
                  {projects.map((proj) => (
                    <div
                      key={proj._id}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <SmartImage
                          src={proj.coverImage?.url}
                          alt={proj.title}
                          className="w-20 h-14 object-cover border border-[#DDD8CE] shrink-0"
                        />
                        <div>
                          <p className="font-serif text-lg text-[#292824]">{proj.title}</p>
                          <p className="text-xs text-[#77746D]">
                            {proj.category} · {proj.location} · {proj.completionYear} ·{' '}
                            {proj.published ? 'Published' : 'Draft'}
                            {proj.featured ? ' · Featured' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            saveProjectItem({ ...proj, published: !proj.published }, proj._id)
                          }
                          className="px-3 py-1.5 border border-[#DDD8CE] text-xs uppercase tracking-wider hover:bg-[#EAE5DC]"
                        >
                          {proj.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditProject(proj)}
                          className="p-2 border border-[#DDD8CE] text-[#292824] hover:bg-[#EAE5DC]"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmState({
                              isOpen: true,
                              title: 'Delete Project',
                              message: `Permanently delete "${proj.title}" and its associated Cloudinary media references?`,
                              onConfirm: async () => {
                                await deleteProjectItem(proj._id);
                                setConfirmState({ isOpen: false });
                                toast.success('Project deleted.');
                              },
                            })
                          }
                          className="p-2 border border-[#DDD8CE] text-[#292824] hover:bg-[#292824] hover:text-[#F7F5F0]"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. SERVICES MANAGEMENT TAB */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              <form
                onSubmit={handleSaveService}
                className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 sm:p-8 space-y-4"
              >
                <h2 className="font-serif text-2xl border-b border-[#DDD8CE] pb-3">
                  {editingServiceId ? 'Edit Studio Service' : 'Add Studio Service'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Service Title *"
                    value={serviceForm.title}
                    onChange={(e) => setServiceForm((s) => ({ ...s, title: e.target.value }))}
                    className="px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Subtitle / Scope"
                    value={serviceForm.subtitle}
                    onChange={(e) => setServiceForm((s) => ({ ...s, subtitle: e.target.value }))}
                    className="px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Display Order"
                    value={serviceForm.displayOrder}
                    onChange={(e) =>
                      setServiceForm((s) => ({ ...s, displayOrder: e.target.value }))
                    }
                    className="px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
                <input
                  type="url"
                  placeholder="Service Photograph URL"
                  value={serviceForm.imageUrl}
                  onChange={(e) => setServiceForm((s) => ({ ...s, imageUrl: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                />
                <textarea
                  rows={2}
                  required
                  placeholder="Detailed service description *"
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm((s) => ({ ...s, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                />
                <textarea
                  rows={3}
                  required
                  placeholder="Key Deliverables (one per line) *"
                  value={serviceForm.deliverablesText}
                  onChange={(e) =>
                    setServiceForm((s) => ({ ...s, deliverablesText: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#292824] text-[#F7F5F0] text-xs uppercase tracking-widest hover:bg-[#777C61]"
                >
                  {editingServiceId ? 'Update Service' : 'Add Service'}
                </button>
              </form>

              <div className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 divide-y divide-[#DDD8CE]">
                {services.map((srv) => (
                  <div
                    key={srv._id}
                    className="py-4 flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-serif text-lg text-[#292824]">
                        #{srv.displayOrder} — {srv.title}
                      </p>
                      <p className="text-xs text-[#77746D]">
                        {(srv.deliverables || []).length} deliverables · {srv.estimatedTimeline}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditService(srv)}
                        className="p-2 border border-[#DDD8CE] hover:bg-[#EAE5DC]"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setConfirmState({
                            isOpen: true,
                            title: 'Delete Service',
                            message: `Delete "${srv.title}" from the studio services page?`,
                            onConfirm: async () => {
                              await deleteServiceItem(srv._id);
                              setConfirmState({ isOpen: false });
                              toast.success('Service deleted.');
                            },
                          })
                        }
                        className="p-2 border border-[#DDD8CE] hover:bg-[#292824] hover:text-[#F7F5F0]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. TESTIMONIALS MANAGEMENT TAB */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <form
                onSubmit={handleSaveTestimonial}
                className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 sm:p-8 space-y-4"
              >
                <h2 className="font-serif text-2xl border-b border-[#DDD8CE] pb-3">
                  {editingTestimonialId ? 'Edit Client Testimonial' : 'Add Client Testimonial'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Client Name *"
                    value={testimonialForm.clientName}
                    onChange={(e) =>
                      setTestimonialForm((t) => ({ ...t, clientName: e.target.value }))
                    }
                    className="px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Project Type *"
                    value={testimonialForm.projectType}
                    onChange={(e) =>
                      setTestimonialForm((t) => ({ ...t, projectType: e.target.value }))
                    }
                    className="px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                  <input
                    type="url"
                    placeholder="Optional Client Photo URL"
                    value={testimonialForm.clientPhotoUrl}
                    onChange={(e) =>
                      setTestimonialForm((t) => ({ ...t, clientPhotoUrl: e.target.value }))
                    }
                    className="px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Authentic client feedback quote *"
                  value={testimonialForm.feedback}
                  onChange={(e) =>
                    setTestimonialForm((t) => ({ ...t, feedback: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#292824] text-[#F7F5F0] text-xs uppercase tracking-widest hover:bg-[#777C61]"
                >
                  {editingTestimonialId ? 'Save Changes' : 'Add Testimonial'}
                </button>
              </form>

              <div className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 divide-y divide-[#DDD8CE]">
                {testimonials.map((t) => (
                  <div
                    key={t._id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-xl">
                      <p className="font-medium text-sm text-[#292824]">
                        {t.clientName} — <span className="text-[#777C61]">{t.projectType}</span>
                      </p>
                      <p className="text-xs italic text-[#77746D]">“{t.feedback}”</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          saveTestimonialItem({ ...t, published: !t.published }, t._id)
                        }
                        className="px-3 py-1 border border-[#DDD8CE] text-xs uppercase"
                      >
                        {t.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteTestimonialItem(t._id)}
                        className="p-2 border border-[#DDD8CE] hover:bg-[#292824] hover:text-[#F7F5F0]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. APPOINTMENTS MANAGEMENT TAB */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="font-serif text-2xl">Consultation Bookings</h2>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setApptFilter(st)}
                        className={`px-3 py-1.5 text-xs uppercase tracking-widest border ${
                          apptFilter === st
                            ? 'bg-[#292824] text-[#F7F5F0] border-[#292824]'
                            : 'bg-[#F7F5F0] text-[#77746D] border-[#DDD8CE]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {rescheduleTarget && (
                  <form
                    onSubmit={handleRescheduleSubmit}
                    className="bg-[#EAE5DC] border border-[#777C61] p-4 flex flex-wrap items-end gap-4"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#292824] font-semibold">
                        Reschedule {rescheduleTarget.bookingReference} ({rescheduleTarget.clientName})
                      </p>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase">New Date</label>
                      <input
                        type="date"
                        required
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                        className="px-3 py-1.5 bg-[#F7F5F0] border border-[#DDD8CE] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase">New Slot</label>
                      <select
                        value={rescheduleSlot}
                        onChange={(e) => setRescheduleSlot(e.target.value)}
                        className="px-3 py-1.5 bg-[#F7F5F0] border border-[#DDD8CE] text-xs"
                      >
                        {(settings.bookingConfig?.availableTimeSlots || []).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#292824] text-[#F7F5F0] text-xs uppercase tracking-widest"
                    >
                      Confirm Reschedule
                    </button>
                    <button
                      type="button"
                      onClick={() => setRescheduleTarget(null)}
                      className="px-3 py-1.5 border border-[#DDD8CE] text-xs uppercase"
                    >
                      Cancel
                    </button>
                  </form>
                )}

                <div className="divide-y divide-[#DDD8CE]">
                  {filteredAppointments.map((appt) => (
                    <div
                      key={appt._id}
                      className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs bg-[#EAE5DC] px-2 py-0.5 border border-[#DDD8CE]">
                            {appt.bookingReference}
                          </span>
                          <span className="font-serif text-lg text-[#292824]">
                            {appt.clientName}
                          </span>
                          <span className="text-xs uppercase tracking-widest text-[#777C61] font-semibold">
                            · {appt.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#292824]">
                          <strong>{appt.preferredDate}</strong> at <strong>{appt.timeSlot}</strong> ·{' '}
                          {appt.consultationType}
                        </p>
                        <p className="text-xs text-[#77746D]">
                          {appt.email} · {appt.phone} · {appt.projectType} ({appt.location})
                        </p>
                        <p className="text-xs text-[#77746D] italic">“{appt.requirements}”</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleAppointmentStatus(appt._id, 'confirmed')}
                          className="px-3 py-1.5 bg-[#777C61] text-[#FFFFFF] text-xs uppercase tracking-wider flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRescheduleTarget(appt);
                            setRescheduleDate(appt.preferredDate);
                            setRescheduleSlot(appt.timeSlot);
                          }}
                          className="px-3 py-1.5 border border-[#DDD8CE] text-xs uppercase tracking-wider hover:bg-[#EAE5DC]"
                        >
                          Reschedule
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAppointmentStatus(appt._id, 'completed')}
                          className="px-3 py-1.5 border border-[#DDD8CE] text-xs uppercase tracking-wider hover:bg-[#EAE5DC]"
                        >
                          Complete
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAppointmentStatus(appt._id, 'cancelled')}
                          className="px-3 py-1.5 border border-[#DDD8CE] text-xs uppercase tracking-wider text-[#77746D] hover:bg-[#292824] hover:text-[#F7F5F0]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6. ENQUIRIES MANAGEMENT TAB */}
          {activeTab === 'enquiries' && (
            <div className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDD8CE] pb-4">
                <h2 className="font-serif text-2xl">Client Enquiries ({filteredEnquiries.length})</h2>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#77746D] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={enquirySearch}
                      onChange={(e) => setEnquirySearch(e.target.value)}
                      placeholder="Search name, city, type..."
                      className="pl-9 pr-3 py-1.5 bg-[#F7F5F0] border border-[#DDD8CE] text-xs"
                    />
                  </div>
                  <select
                    value={enquiryStatusFilter}
                    onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                    className="px-3 py-1.5 bg-[#F7F5F0] border border-[#DDD8CE] text-xs uppercase"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-[#DDD8CE]">
                {filteredEnquiries.map((enq) => (
                  <div
                    key={enq._id}
                    className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-lg text-[#292824]">{enq.name}</span>
                        <span className="px-2 py-0.5 text-[10px] uppercase tracking-widest bg-[#EAE5DC] border border-[#DDD8CE]">
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#777C61]">
                        {enq.projectType} · {enq.location} · Budget: {enq.budgetRange}
                      </p>
                      <p className="text-xs text-[#77746D]">
                        {enq.email} · {enq.phone}
                      </p>
                      <p className="text-sm text-[#292824] pt-1">{enq.message}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={enq.status}
                        onChange={(e) => {
                          updateEnquiryItem(enq._id, { status: e.target.value });
                          toast.success('Enquiry status updated.');
                        }}
                        className="px-3 py-1.5 bg-[#F7F5F0] border border-[#DDD8CE] text-xs uppercase"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        type="button"
                        onClick={() =>
                          setConfirmState({
                            isOpen: true,
                            title: 'Delete Enquiry',
                            message: `Permanently delete the enquiry from ${enq.name}?`,
                            onConfirm: async () => {
                              await deleteEnquiryItem(enq._id);
                              setConfirmState({ isOpen: false });
                              toast.success('Enquiry deleted.');
                            },
                          })
                        }
                        className="p-2 border border-[#DDD8CE] hover:bg-[#292824] hover:text-[#F7F5F0]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. WEBSITE CONTENT SETTINGS & BOOKING CONFIG TAB */}
          {activeTab === 'settings' && (
            <form
              onSubmit={handleSaveSettings}
              className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 sm:p-8 space-y-6"
            >
              <h2 className="font-serif text-2xl border-b border-[#DDD8CE] pb-3">
                Website Content & Consultation Schedule Configuration
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">
                    Studio Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.studioName}
                    onChange={(e) =>
                      setSettingsForm((s) => ({
                        ...s,
                        studioName: e.target.value,
                        logoText: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">
                    Homepage Hero Headline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.heroHeadline}
                    onChange={(e) =>
                      setSettingsForm((s) => ({ ...s, heroHeadline: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest mb-1">
                  Homepage Hero Introduction
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.heroIntroduction}
                  onChange={(e) =>
                    setSettingsForm((s) => ({ ...s, heroIntroduction: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">Phone</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm((s) => ({ ...s, phone: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">Email</label>
                  <input
                    type="text"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm((s) => ({ ...s, email: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">
                    WhatsApp Number (Digits)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) =>
                      setSettingsForm((s) => ({ ...s, whatsappNumber: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">
                    Studio Address
                  </label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm((s) => ({ ...s, address: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">
                    Business Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.businessHours}
                    onChange={(e) =>
                      setSettingsForm((s) => ({ ...s, businessHours: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">
                    Instagram Profile URL
                  </label>
                  <input
                    type="url"
                    value={settingsForm.instagramUrl}
                    onChange={(e) =>
                      setSettingsForm((s) => ({ ...s, instagramUrl: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">
                    Map Embed URL
                  </label>
                  <input
                    type="url"
                    value={settingsForm.googleMapsEmbedUrl}
                    onChange={(e) =>
                      setSettingsForm((s) => ({ ...s, googleMapsEmbedUrl: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
              </div>

              <div className="bg-[#EAE5DC]/60 border border-[#DDD8CE] p-5 space-y-4">
                <h3 className="font-serif text-lg">
                  Consultation Slot & Buffer Configuration
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1">
                      Available Daily Time Slots (HH:mm, comma-separated)
                    </label>
                    <input
                      type="text"
                      value={slotsText}
                      onChange={(e) => setSlotsText(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1">
                      Default Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      value={settingsForm.bookingConfig?.defaultDurationMinutes || 60}
                      onChange={(e) =>
                        setSettingsForm((s) => ({
                          ...s,
                          bookingConfig: {
                            ...s.bookingConfig,
                            defaultDurationMinutes: Number(e.target.value),
                          },
                        }))
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1">
                      Buffer Between Bookings (Minutes)
                    </label>
                    <input
                      type="number"
                      value={settingsForm.bookingConfig?.bufferTimeMinutes || 30}
                      onChange={(e) =>
                        setSettingsForm((s) => ({
                          ...s,
                          bookingConfig: {
                            ...s.bookingConfig,
                            bufferTimeMinutes: Number(e.target.value),
                          },
                        }))
                      }
                      className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#292824] text-[#F7F5F0] text-xs uppercase tracking-widest hover:bg-[#777C61]"
              >
                Save All Studio & Booking Settings
              </button>
            </form>
          )}

          {/* 8. MEDIA MANAGEMENT (CLOUDINARY) TAB */}
          {activeTab === 'media' && (
            <div className="space-y-8">
              <form
                onSubmit={handleMediaUpload}
                className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 sm:p-8 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#DDD8CE] pb-3">
                  <h2 className="font-serif text-2xl">Cloudinary Architectural Media Library</h2>
                  <span className="text-xs uppercase tracking-widest text-[#777C61] flex items-center gap-1">
                    <UploadCloud className="w-4 h-4" /> Auto-WebP Optimization
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Asset Title"
                    value={mediaTitle}
                    onChange={(e) => setMediaTitle(e.target.value)}
                    className="px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                  <input
                    type="url"
                    required
                    placeholder="Image Source URL to Index in Cloudinary *"
                    value={mediaUrlInput}
                    onChange={(e) => setMediaUrlInput(e.target.value)}
                    className="px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                  <select
                    value={mediaCategory}
                    onChange={(e) => setMediaCategory(e.target.value)}
                    className="px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {uploadProgress > 0 && (
                  <div className="w-full bg-[#EAE5DC] h-2 overflow-hidden">
                    <div
                      className="bg-[#777C61] h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#292824] text-[#F7F5F0] text-xs uppercase tracking-widest hover:bg-[#777C61]"
                >
                  Upload & Index Image
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {mediaAssets.map((asset) => (
                  <div
                    key={asset._id}
                    className="bg-[#FFFFFF] border border-[#DDD8CE] overflow-hidden flex flex-col justify-between"
                  >
                    <SmartImage
                      src={asset.url}
                      alt={asset.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <p className="font-serif text-base text-[#292824]">{asset.title}</p>
                      <p className="font-mono text-[11px] text-[#77746D] truncate">
                        ID: {asset.publicId}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-[#DDD8CE]">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(asset.url);
                            toast.success('Copied image URL');
                          }}
                          className="text-xs uppercase tracking-widest text-[#777C61] hover:underline"
                        >
                          Copy URL
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteMediaItem(asset._id);
                            toast.success('Deleted from Cloudinary.');
                          }}
                          className="text-xs uppercase tracking-widest text-[#77746D] hover:text-[#292824]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. ADMIN PROFILE & SECURITY TAB */}
          {activeTab === 'profile' && (
            <div className="bg-[#FFFFFF] border border-[#DDD8CE] p-6 sm:p-8 max-w-xl space-y-6">
              <h2 className="font-serif text-2xl border-b border-[#DDD8CE] pb-3">
                Administrator Security & Password Rotation
              </h2>
              <div className="text-sm space-y-1 bg-[#EAE5DC] p-4 border border-[#DDD8CE]">
                <p>
                  <strong>Signed-in Administrator:</strong> {adminUser.name}
                </p>
                <p>
                  <strong>Email:</strong> {adminUser.email}
                </p>
                <p>
                  <strong>Role:</strong> {adminUser.role || 'superadmin'}
                </p>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (newPassword.length < 8) {
                    toast.error('New password must be at least 8 characters.');
                    return;
                  }
                  const res = await changeAdminPassword(currentPassword, newPassword);
                  if (res.success) {
                    setCurrentPassword('');
                    setNewPassword('');
                  } else {
                    toast.error(res.message);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-1">
                    New Password (min 8 chars, bcrypt hashed) *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7F5F0] border border-[#DDD8CE] text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#292824] text-[#F7F5F0] text-xs uppercase tracking-widest hover:bg-[#777C61]"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}
        </section>
      </div>

      <ConfirmModal
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        onConfirm={confirmState.onConfirm}
        onCancel={() => setConfirmState({ isOpen: false })}
      />
    </div>
  );
};

export default AdminDashboardPage;
