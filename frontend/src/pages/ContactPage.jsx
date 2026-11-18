import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useStudio } from '../context/StudioContext';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { PageContainer } from '../components/common/EditorialPrimitives';

const BUDGET_RANGES = [
  '₹25L – ₹50L (Space Planning / Focused Suite)',
  '₹50L – ₹1.2 Cr (Full Apartment / Boutique Commercial)',
  '₹1.2 Cr – ₹2.5 Cr (Luxury Residence / Heritage Remodel)',
  '₹2.5 Cr+ (Turnkey Villa / Penthouse Architecture)',
];

const ContactPage = () => {
  const { settings, submitEnquiry } = useStudio();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: searchParams.get('projectType') || 'Residential Interior Design',
    budgetRange: BUDGET_RANGES[1],
    location: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    document.title = `Contact — ${settings.studioName || 'Atelier Vera'}`;
  }, [settings.studioName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.location.trim() ||
      !formData.message.trim()
    ) {
      toast.error('Please complete all required enquiry fields.');
      return;
    }
    setSubmitting(true);
    const result = await submitEnquiry(formData);
    setSubmitting(false);

    if (result.success) {
      setSubmittedSuccess(true);
      toast.success('Enquiry received by Atelier Vera.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Residential Interior Design',
        budgetRange: BUDGET_RANGES[1],
        location: '',
        message: '',
      });
    } else {
      toast.error(result.message || 'Could not submit enquiry.');
    }
  };

  const cleanWa = String(settings.whatsappNumber || '919820000000').replace(/[^0-9]/g, '');

  return (
    <div className="bg-[#F8F7F3] text-[#292824] pt-14 sm:pt-20 pb-28 lg:pb-36">
      <PageContainer className="space-y-20">
        <div className="max-w-3xl space-y-4">
          <RevealOnScroll variant="text">
            <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
              Contact
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="heading" delay={0.05}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] text-[#292824] leading-[1.1]">
              Begin a Conversation
            </h1>
          </RevealOnScroll>
        </div>

        {/* Balanced Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start border-t border-[#DEDAD1] pt-16">
          {/* Left Column: Studio Contact Information */}
          <div className="lg:col-span-5 space-y-10">
            <RevealOnScroll variant="text" className="space-y-6">
              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                  Studio Address
                </p>
                <p className="text-base text-[#292824] leading-relaxed">
                  {settings.address}
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                  Direct Enquiries
                </p>
                <p className="text-base text-[#292824]">{settings.phone}</p>
                <p className="text-base text-[#292824]">{settings.email}</p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                  Studio Hours
                </p>
                <p className="text-sm text-[#77746D]">{settings.businessHours}</p>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs uppercase tracking-[0.12em] text-[#77746D]">
                  Channels
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <a
                    href={`https://wa.me/${cleanWa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-[#292824] pb-0.5 hover:text-[#777C61] hover:border-[#777C61] transition-colors"
                  >
                    WhatsApp Studio
                  </a>
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-[#292824] pb-0.5 hover:text-[#777C61] hover:border-[#777C61] transition-colors"
                  >
                    Instagram ({settings.instagramHandle})
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll variant="image" delay={0.1}>
              <div className="bg-[#EFEBE3] overflow-hidden">
                <iframe
                  title="Atelier Vera Studio Location"
                  src={settings.googleMapsEmbedUrl}
                  className="w-full h-64 border-0 grayscale opacity-90"
                  loading="lazy"
                />
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Clean Editorial Contact Form */}
          <div className="lg:col-span-7">
            <RevealOnScroll variant="heading" delay={0.08}>
              {submittedSuccess ? (
                <div className="bg-[#EFEBE3] p-10 sm:p-14 space-y-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#777C61]">
                    Enquiry Logged
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#292824]">
                    Thank You for Writing to Us.
                  </h2>
                  <p className="text-base text-[#77746D] leading-relaxed">
                    Your project brief has been saved. A senior architect will review your details and respond within one business day.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => setSubmittedSuccess(false)}
                      className="px-6 py-3 border border-[#292824] text-sm text-[#292824] hover:bg-[#F8F7F3]"
                    >
                      Send Another Message
                    </button>
                    <Link
                      to="/book-consultation"
                      className="px-6 py-3 bg-[#292824] text-[#F8F7F3] text-sm"
                    >
                      Book a Consultation
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs text-[#77746D] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Kabir Singhania"
                        className="w-full pb-3 bg-transparent border-b border-[#DEDAD1] text-base text-[#292824] focus:outline-none focus:border-[#292824] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#77746D] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@domain.com"
                        className="w-full pb-3 bg-transparent border-b border-[#DEDAD1] text-base text-[#292824] focus:outline-none focus:border-[#292824] transition-colors"
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
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98200 00000"
                        className="w-full pb-3 bg-transparent border-b border-[#DEDAD1] text-base text-[#292824] focus:outline-none focus:border-[#292824] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#77746D] mb-2">
                        Project Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Malabar Hill, Mumbai"
                        className="w-full pb-3 bg-transparent border-b border-[#DEDAD1] text-base text-[#292824] focus:outline-none focus:border-[#292824] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs text-[#77746D] mb-2">
                        Service Area *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full pb-3 bg-transparent border-b border-[#DEDAD1] text-base text-[#292824] focus:outline-none focus:border-[#292824]"
                      >
                        <option value="Residential Interior Design">Residential Interior Design</option>
                        <option value="Commercial Interior Design">Commercial Interior Design</option>
                        <option value="Modular Kitchen Design">Modular Kitchen Design</option>
                        <option value="Bedroom and Living Room Design">Bedroom and Living Room Design</option>
                        <option value="Office Interiors">Office Interiors</option>
                        <option value="Renovation and Remodeling">Renovation and Remodeling</option>
                        <option value="Space Planning and Consultation">Space Planning and Consultation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-[#77746D] mb-2">
                        Estimated Investment *
                      </label>
                      <select
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full pb-3 bg-transparent border-b border-[#DEDAD1] text-base text-[#292824] focus:outline-none focus:border-[#292824]"
                      >
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#77746D] mb-2">
                      Project Brief *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your approximate floor area, target timeline, and architectural goals..."
                      className="w-full p-3.5 bg-[#EFEBE3]/50 border border-[#DEDAD1] text-base text-[#292824] focus:outline-none focus:border-[#292824]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-9 py-4 bg-[#292824] text-[#F8F7F3] text-sm hover:bg-[#777C61] transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Sending Enquiry...' : 'Send Enquiry'}
                  </button>
                </form>
              )}
            </RevealOnScroll>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default ContactPage;
