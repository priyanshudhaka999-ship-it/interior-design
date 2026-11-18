const mongoose = require('mongoose');

const instagramItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    imageUrl: { type: String, required: true },
    publicId: { type: String, default: '' },
    caption: { type: String, default: '' },
    postUrl: { type: String, default: 'https://instagram.com' },
    tag: { type: String, default: '@ateliervera.studio' },
  },
  { _id: false }
);

const websiteSettingsSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: 'default_settings',
      unique: true,
    },
    isDemoConfiguration: {
      type: Boolean,
      default: true,
    },
    studioName: {
      type: String,
      default: 'ATELIER VERA',
      trim: true,
    },
    studioTagline: {
      type: String,
      default: 'Interior Architecture & Spatial Design Studio',
      trim: true,
    },
    logoText: {
      type: String,
      default: 'ATELIER VERA',
      trim: true,
    },
    logoUrl: {
      type: String,
      default: '',
    },
    heroHeadline: {
      type: String,
      default: 'Thoughtful Spaces. Timeless Living.',
      trim: true,
    },
    heroIntroduction: {
      type: String,
      default:
        'We craft calm, tactile interiors shaped by natural light, honest materials, and enduring architectural proportion for discerning private residences and cultural spaces.',
      trim: true,
    },
    heroImageUrl: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
    },
    phone: {
      type: String,
      default: '+91 22 4890 7321 (Demo — Replace Before Launch)',
      trim: true,
    },
    email: {
      type: String,
      default: 'studio@ateliervera.example (Demo — Replace Before Launch)',
      trim: true,
    },
    whatsappNumber: {
      type: String,
      default: '919820000000',
      trim: true,
    },
    instagramUrl: {
      type: String,
      default: 'https://www.instagram.com/ateliervera.demo',
      trim: true,
    },
    instagramHandle: {
      type: String,
      default: '@ateliervera.demo',
      trim: true,
    },
    address: {
      type: String,
      default:
        'Suite 4B, The Limestone Courtyard, Mandlik Road, Colaba, Mumbai 400001 (Fictional Demo Address)',
      trim: true,
    },
    businessHours: {
      type: String,
      default: 'Monday – Saturday: 10:00 AM – 6:30 PM IST (By Appointment)',
      trim: true,
    },
    googleMapsEmbedUrl: {
      type: String,
      default:
        'https://www.openstreetmap.org/export/embed.html?bbox=72.825%2C18.918%2C72.838%2C18.928&layer=mapnik',
      trim: true,
    },
    footerNote: {
      type: String,
      default:
        'Demo Configuration Notice: All contact details, client quotes, and studio coordinates shown are fictional sample records and must be replaced via Admin Settings prior to commercial launch.',
      trim: true,
    },
    bookingConfig: {
      timezone: { type: String, default: 'Asia/Kolkata' },
      availableDaysOfWeek: {
        // 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat (0=Sun closed)
        type: [Number],
        default: [1, 2, 3, 4, 5, 6],
      },
      availableTimeSlots: {
        type: [String],
        default: ['10:00', '11:30', '14:00', '15:30', '17:00'],
      },
      blockedDates: {
        type: [String],
        default: [],
      },
      defaultDurationMinutes: {
        type: Number,
        default: 60,
      },
      bufferTimeMinutes: {
        type: Number,
        default: 30,
      },
    },
    instagramShowcase: {
      type: [instagramItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WebsiteSettings', websiteSettingsSchema);
