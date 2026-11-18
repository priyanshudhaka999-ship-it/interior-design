const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const WebsiteSettings = require('../models/WebsiteSettings');

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@ateliervera.com';
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'AtelierVera@2026';
    const adminName = process.env.INITIAL_ADMIN_NAME || 'Elena Rostova';

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      admin = await Admin.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin',
      });
      console.log(`Created initial administrator: ${admin.email}`);
    } else {
      console.log(`Administrator already exists: ${admin.email}`);
    }

    await WebsiteSettings.findOneAndUpdate(
      { singletonKey: 'default_settings' },
      {
        singletonKey: 'default_settings',
        isDemoConfiguration: true,
        studioName: 'ATELIER VERA',
        studioTagline: 'Interior Architecture & Spatial Design Studio',
        logoText: 'ATELIER VERA',
        heroHeadline: 'Thoughtful Spaces. Timeless Living.',
        heroIntroduction:
          'We craft calm, tactile interiors shaped by natural light, honest materials, and enduring architectural proportion for discerning private residences and cultural spaces.',
      },
      { upsert: true, new: true }
    );

    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: 'The Malabar Limestone Residence',
          slug: 'malabar-limestone-residence',
          category: 'Residential',
          location: 'Malabar Hill, Mumbai',
          completionYear: 2026,
          areaSqFt: '4,400 sq. ft.',
          leadDesigner: 'Elena Rostova',
          shortDescription:
            'A serene sea-facing apartment defined by honed Kota stone, lime plaster walls, and custom Burma teak millwork.',
          overview:
            'Conceived as a quiet sanctuary above the Arabian Sea, the Malabar Limestone Residence reimagines a fragmented 1980s floor plate into a fluid sequence of light-filled pavilions.',
          designConcept:
            'Warm Minimalist Luxury anchored in monolithic travertine volumes, breathable mineral lime plaster, and unbleached Belgian linen drapery.',
          challenges:
            'Low structural beam clearances and a compartmentalized corridor layout obstructed cross-ventilation and coastal views.',
          solutions:
            'Non-structural partitions were replaced with full-height pivoted fluted oak screens and recessed architectural lighting troughs.',
          materialsPalette: ['Honed Kota & Travertine', 'Hand-troweled Lime Plaster', 'Reclaimed Burma Teak', 'Unlacquered Brushed Brass'],
          coverImage: {
            url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
            publicId: 'demo/malabar-cover',
            alt: 'Living salon of The Malabar Limestone Residence',
          },
          gallery: [
            {
              url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
              publicId: 'demo/malabar-1',
              alt: 'Dining gallery with custom travertine table',
            },
            {
              url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85',
              publicId: 'demo/malabar-2',
              alt: 'Primary suite in warm sand tones',
            },
          ],
          beforeAfter: {
            enabled: true,
            beforeImage: {
              url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
              publicId: 'demo/malabar-before',
              alt: 'Original enclosed living room before architectural intervention',
            },
            afterImage: {
              url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
              publicId: 'demo/malabar-after',
              alt: 'Completed open-plan limestone living room',
            },
            transformationSummary:
              'Removed three load-free masonry partitions to create a 42-foot uninterrupted coastal sightline with integrated acoustic oak joinery.',
            structuralChanges: ['3Partitions Removed', 'Natural Daylight +65%', 'Custom Acoustic Millwork'],
          },
          featured: true,
          published: true,
          displayOrder: 1,
        },
      ]);
      console.log('Seeded initial portfolio projects.');
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        {
          title: 'Residential Interior Design',
          slug: 'residential-interior-design',
          subtitle: 'Private Residences, Penthouses & Heritage Villas',
          description:
            'Holistic interior architecture for private homes, balancing spatial calm, bespoke millwork, natural stone masonry, and curated collectible furniture.',
          deliverables: [
            'Architectural space planning & circulation study',
            'Custom furniture, millwork & wardrobe engineering',
            'Natural stone, timber & textile material boards',
            'Lighting design & art curation advisory',
          ],
          estimatedTimeline: '12 – 24 Weeks',
          image: {
            url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
            publicId: 'demo/service-residential',
            alt: 'Warm minimalist residential living space',
          },
          displayOrder: 1,
          published: true,
        },
      ]);
      console.log('Seeded initial studio services.');
    }

    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany([
        {
          clientName: 'Aarav & Meera Singhania (Demo Client Record)',
          projectType: 'Full Residential Architecture — Malabar Hill',
          location: 'Mumbai',
          feedback:
            'Atelier Vera brought an extraordinary sense of stillness and proportion to our home. Every joinery detail and stone junction feels timeless rather than trend-driven.',
          isDemoContent: true,
          published: true,
          displayOrder: 1,
        },
      ]);
      console.log('Seeded clearly marked demo testimonials.');
    }

    console.log('Database seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seedDatabase();
