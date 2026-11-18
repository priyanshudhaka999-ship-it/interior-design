export const INITIAL_SETTINGS = {
  isDemoConfiguration: true,
  studioName: 'Atelier Vera',
  studioTagline: 'Interior Architecture & Spatial Design Studio',
  logoText: 'Atelier Vera',
  heroHeadline: 'Spaces That Feel Like Home.',
  heroIntroduction:
    'We craft calm, tactile interiors shaped by natural light, honest materials, and enduring architectural proportion for discerning private residences and cultural spaces.',
  heroImageUrl:
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
  phone: '+91 22 4890 7321 (Demo — Replace Before Launch)',
  email: 'studio@ateliervera.example (Demo — Replace Before Launch)',
  whatsappNumber: '919820000000',
  instagramUrl: 'https://www.instagram.com/ateliervera.demo',
  instagramHandle: '@ateliervera.demo',
  address:
    'Suite 4B, The Limestone Courtyard, Mandlik Road, Colaba, Mumbai 400001 (Fictional Demo Address)',
  businessHours: 'Monday – Saturday: 10:00 AM – 6:30 PM IST (By Appointment)',
  googleMapsEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=72.825%2C18.918%2C72.838%2C18.928&layer=mapnik',
  footerNote:
    'Demo Configuration Notice: All contact details, client feedback quotes, and studio coordinates are fictional sample records and can be customized in the Admin Settings panel.',
  bookingConfig: {
    timezone: 'Asia/Kolkata',
    availableDaysOfWeek: [1, 2, 3, 4, 5, 6],
    availableTimeSlots: ['10:00', '11:30', '14:00', '15:30', '17:00'],
    blockedDates: [],
    defaultDurationMinutes: 60,
    bufferTimeMinutes: 30,
  },
  instagramShowcase: [
    {
      id: 'ig-1',
      imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
      caption: 'Morning light across honed travertine and Belgian linen in our Malabar Hill residence.',
      postUrl: 'https://www.instagram.com/ateliervera.demo',
      tag: '@ateliervera.demo',
    },
    {
      id: 'ig-2',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80',
      caption: 'Bespoke fluted oak kitchen island with integrated bronze hardware.',
      postUrl: 'https://www.instagram.com/ateliervera.demo',
      tag: '@ateliervera.demo',
    },
    {
      id: 'ig-3',
      imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80',
      caption: 'Primary suite sanctuary in lime plaster and raw silk.',
      postUrl: 'https://www.instagram.com/ateliervera.demo',
      tag: '@ateliervera.demo',
    },
    {
      id: 'ig-4',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
      caption: 'Quiet acoustic library and private family office in New Delhi.',
      postUrl: 'https://www.instagram.com/ateliervera.demo',
      tag: '@ateliervera.demo',
    },
    {
      id: 'ig-5',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      caption: 'Custom monolithic dining table in solid smoked oak.',
      postUrl: 'https://www.instagram.com/ateliervera.demo',
      tag: '@ateliervera.demo',
    },
    {
      id: 'ig-6',
      imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
      caption: 'Tactile material library study: Kota stone, unlacquered brass, and bouclé.',
      postUrl: 'https://www.instagram.com/ateliervera.demo',
      tag: '@ateliervera.demo',
    },
  ],
};

export const INITIAL_PROJECTS = [
  {
    _id: 'proj-1',
    title: 'The Malabar Limestone Residence',
    slug: 'malabar-limestone-residence',
    category: 'Residential',
    location: 'Malabar Hill, Mumbai',
    completionYear: 2026,
    areaSqFt: '4,400 sq. ft.',
    leadDesigner: 'Elena Rostova',
    shortDescription:
      'A serene sea-facing residence defined by honed Kota stone, mineral lime plaster walls, and bespoke Burma teak joinery.',
    overview:
      'Conceived as a quiet sanctuary above the Arabian Sea, the Malabar Limestone Residence reimagines a fragmented 1980s floor plate into a fluid sequence of light-filled pavilions. Every threshold is framed in solid reclaimed teak to honor architectural permanence.',
    designConcept:
      'Warm Minimalist Luxury anchored in monolithic travertine volumes, breathable hand-troweled lime plaster, and unbleached Belgian linen drapery that filters harsh western coastal glare.',
    challenges:
      'Low structural beam clearances and a compartmentalized corridor layout obstructed cross-ventilation and coastal views.',
    solutions:
      'Non-structural partitions were replaced with full-height pivoted fluted oak screens and recessed architectural perimeter lighting troughs.',
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
        alt: 'Architectural corridor and timber portal',
      },
      {
        url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=85',
        publicId: 'demo/malabar-3',
        alt: 'Primary bedroom suite in warm sand tones',
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
      structuralChanges: ['3 Masonry Walls Removed', 'Daylight Penetration +65%', 'Concealed HVAC Joinery'],
    },
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    _id: 'proj-2',
    title: 'Maison Serein Flagship Atelier',
    slug: 'maison-serein-flagship-atelier',
    category: 'Commercial',
    location: 'Kala Ghoda, Mumbai',
    completionYear: 2025,
    areaSqFt: '3,100 sq. ft.',
    leadDesigner: 'Elena Rostova & Kabir Mehta',
    shortDescription:
      'An editorial retail gallery and private client salon inside a restored heritage building with vaulted ceilings.',
    overview:
      'Designed for a slow-luxury textile house, Maison Serein merges gallery-grade spatial restraint with intimate domestic warmth so patrons experience garments as tactile architectural objects.',
    designConcept:
      'Raw limestone plinths, suspended raw-linen acoustic baffles, and custom bronze display rails set against lime-washed heritage masonry.',
    challenges:
      'Strict heritage conservation rules prohibited drilling into original load-bearing basalt columns or altering the street facade.',
    solutions:
      'Engineered self-supporting counterbalance brass armatures and floating timber floorboards that conceal all electrical conduits without touching historic stone.',
    materialsPalette: ['Dhrangadhra Sandstone Plinths', 'Oil-Rubbed Bronze', 'Lime-washed Brick', 'Smoked European Oak'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      publicId: 'demo/serein-cover',
      alt: 'Maison Serein commercial gallery interior',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
        publicId: 'demo/serein-1',
        alt: 'Private consultation lounge',
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85',
        publicId: 'demo/serein-2',
        alt: 'Custom limestone display plinths',
      },
    ],
    beforeAfter: {
      enabled: false,
    },
    featured: true,
    published: true,
    displayOrder: 2,
  },
  {
    _id: 'proj-3',
    title: 'The Travertine & Fluted Oak Culinary Suite',
    slug: 'travertine-fluted-oak-culinary-suite',
    category: 'Kitchen',
    location: 'Jor Bagh, New Delhi',
    completionYear: 2026,
    areaSqFt: '680 sq. ft.',
    leadDesigner: 'Kabir Mehta',
    shortDescription:
      'An architectural modular kitchen with pocket-door appliance garages, silver travertine counters, and a 14-foot monolithic island.',
    overview:
      'Rather than treating the kitchen as a utilitarian zone, this project integrates culinary preparation directly into the formal dining architecture through disappearing pocket cabinetry.',
    designConcept:
      'Architectural minimalism where appliances, extraction hoods, and prep sinks recess seamlessly behind hand-fluted white oak doors.',
    challenges:
      'Accommodating heavy Indian wet-cooking ventilation alongside an open-plan entertaining island without visual clutter or odour transfer.',
    solutions:
      'Designed a concealed dual-stage baffle extraction plenum and a secondary sliding pocket scullery clad in matching vein-cut travertine.',
    materialsPalette: ['Vein-Cut Silver Travertine', 'Quarter-Sawn Fluted White Oak', 'Aged Brass Tapware', 'Matte Porcelain Internal Carcasses'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=85',
      publicId: 'demo/kitchen-cover',
      alt: 'Travertine and fluted oak modular kitchen',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=85',
        publicId: 'demo/kitchen-1',
        alt: 'Monolithic stone island detail',
      },
      {
        url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=85',
        publicId: 'demo/kitchen-2',
        alt: 'Integrated timber pantry cabinetry',
      },
    ],
    beforeAfter: {
      enabled: true,
      beforeImage: {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80',
        publicId: 'demo/kitchen-before',
        alt: 'Dated closed kitchen with glossy laminate cabinets',
      },
      afterImage: {
        url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85',
        publicId: 'demo/kitchen-after',
        alt: 'Completed architectural oak and travertine culinary suite',
      },
      transformationSummary:
        'Converted a dark corridor galley kitchen into an open architectural culinary pavilion with concealed scullery pocket doors.',
      structuralChanges: ['Pocket Scullery Integration', '14-ft Travertine Island', 'Concealed Ducting'],
    },
    featured: true,
    published: true,
    displayOrder: 3,
  },
  {
    _id: 'proj-4',
    title: 'The Courtyard Pavilion Living Salon',
    slug: 'courtyard-pavilion-living-salon',
    category: 'Living Room',
    location: 'Sadashivanagar, Bengaluru',
    completionYear: 2025,
    areaSqFt: '1,450 sq. ft.',
    leadDesigner: 'Elena Rostova',
    shortDescription:
      'A double-height living room framing a tropical rain-tree courtyard with low-slung bouclé seating and cast-stone hearth.',
    overview:
      'Anchored around a century-old rain tree, this living pavilion dissolves the boundary between interior lounge and landscaped veranda.',
    designConcept:
      'Low horizontal furniture silhouettes keep sightlines completely open to the garden canopy while warm acoustic timber ceilings temper reverberation.',
    challenges:
      'Controlling afternoon acoustics and tropical humidity in a 19-foot double-height glazed volume.',
    solutions:
      'Installed perforated cedar acoustic ceiling slats and breathable mineral clay wall renders that naturally regulate indoor humidity.',
    materialsPalette: ['Slaked Lime Clay Render', 'Western Red Cedar Slats', 'Unbleached Wool Bouclé', 'Honed Basalt'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      publicId: 'demo/living-cover',
      alt: 'Double-height courtyard living room',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1400&q=85',
        publicId: 'demo/living-1',
        alt: 'Bespoke bouclé sofa and basalt coffee table',
      },
    ],
    beforeAfter: {
      enabled: false,
    },
    featured: false,
    published: true,
    displayOrder: 4,
  },
  {
    _id: 'proj-5',
    title: 'The Quiet Linen Primary Sanctuary',
    slug: 'quiet-linen-primary-sanctuary',
    category: 'Bedroom',
    location: 'Alibaug Coastal Estate',
    completionYear: 2026,
    areaSqFt: '920 sq. ft.',
    leadDesigner: 'Ananya Deshmukh',
    shortDescription:
      'A restorative primary bedroom and dressing suite crafted in woven cane, raw linen panels, and oiled ash wood.',
    overview:
      'Designed as a digital-free retreat, the suite integrates a sleeping pavilion, private reading alcove, and monolithic limestone bathing chamber.',
    designConcept:
      'Soft tactile restraint with zero visible hardware or ceiling downlights; all illumination is indirect warm-dim architectural coves.',
    challenges:
      'Integrating generous wardrobe storage without interrupting the calm, gallery-like perimeter walls.',
    solutions:
      'Created a walk-behind headboard partition wrapped in acoustic Belgian linen that conceals a naturally lit dressing corridor.',
    materialsPalette: ['Oiled Ash Timber', 'Belgian Linen Wall Panels', 'Handwoven Rattan Cane', 'Sandblasted Jaisalmer Stone'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
      publicId: 'demo/bedroom-cover',
      alt: 'Minimalist primary bedroom suite in warm linen and ash wood',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1400&q=85',
        publicId: 'demo/bedroom-1',
        alt: 'Bespoke timber bedside joinery',
      },
    ],
    beforeAfter: {
      enabled: false,
    },
    featured: false,
    published: true,
    displayOrder: 5,
  },
  {
    _id: 'proj-6',
    title: 'Vanguard Family Office & Architectural Library',
    slug: 'vanguard-family-office-chambers',
    category: 'Office',
    location: 'Bandra Kurla Complex, Mumbai',
    completionYear: 2025,
    areaSqFt: '5,200 sq. ft.',
    leadDesigner: 'Kabir Mehta',
    shortDescription:
      'An executive private equity and family office suite designed with the warmth of a residential collectors library.',
    overview:
      'Rejecting sterile corporate glass boxes, Vanguard Chambers pairs museum-grade art lighting with acoustic walnut panelling and ergonomic bespoke boardrooms.',
    designConcept:
      'Hospitality-led workplace architecture featuring a private tea bar, acoustic study booths, and seamless audiovisual integration hidden inside timber joinery.',
    challenges:
      'Achieving STC-55 acoustic privacy between boardrooms while preserving natural daylight across the floor plate.',
    solutions:
      'Double-glazed bronze-framed acoustic partitions with woven horsehair interlayers and custom walnut credenzas housing all conferencing hardware.',
    materialsPalette: ['American Black Walnut', 'Saddle Leather Desk Inlays', 'Brushed Architectural Bronze', 'Acoustic Wool Felt'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      publicId: 'demo/office-cover',
      alt: 'Executive architectural office and library',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85',
        publicId: 'demo/office-1',
        alt: 'Boardroom with bespoke timber table',
      },
    ],
    beforeAfter: {
      enabled: false,
    },
    featured: false,
    published: true,
    displayOrder: 6,
  },
  {
    _id: 'proj-7',
    title: 'The 1930s Art Deco Heritage Restoration',
    slug: 'art-deco-heritage-restoration',
    category: 'Renovation',
    location: 'Oval Maidan, Mumbai',
    completionYear: 2026,
    areaSqFt: '3,650 sq. ft.',
    leadDesigner: 'Elena Rostova',
    shortDescription:
      'Full structural remodeling and conservation of a 1936 Art Deco apartment, restoring original terrazzo floors and teak louvers.',
    overview:
      'Decades of false ceilings and ad-hoc partitions had obscured the apartments 13-foot ceilings and curved verandahs. Our renovation stripped back five layers of alterations to celebrate its original bones.',
    designConcept:
      'Respectful dialogue between restored 1930s geometric terrazzo and contemporary warm minimalist joinery.',
    challenges:
      'Rotten timber floor joists in the wet cores and damaged heritage Burma teak casement windows.',
    solutions:
      'Inserted concealed structural steel flitch plates, hand-cast matching in-situ terrazzo patches, and retrofitted slim acoustic glazing into restored teak frames.',
    materialsPalette: ['Restored In-Situ Terrazzo', 'Salvati Burma Teak', 'Mineral Lime Wash', 'Aged Unlacquered Brass'],
    coverImage: {
      url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      publicId: 'demo/renovation-cover',
      alt: 'Restored Art Deco heritage residence gallery',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
        publicId: 'demo/renovation-1',
        alt: 'Restored verandah dining room',
      },
    ],
    beforeAfter: {
      enabled: true,
      beforeImage: {
        url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
        publicId: 'demo/reno-before',
        alt: 'Dropped plaster ceiling and dark partitions prior to restoration',
      },
      afterImage: {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85',
        publicId: 'demo/reno-after',
        alt: 'Restored 13-foot volume with original arched openings and terrazzo',
      },
      transformationSummary:
        'Dismantled 1990s dropped grid ceilings to recover the original 13-foot ceiling height and restored 1,800 sq. ft. of original geometric terrazzo.',
      structuralChanges: ['13-ft Ceiling Recovered', 'In-Situ Terrazzo Restored', 'MEP Re-engineered'],
    },
    featured: true,
    published: true,
    displayOrder: 7,
  },
];

export const INITIAL_SERVICES = [
  {
    _id: 'srv-1',
    title: 'Residential Interior Design',
    slug: 'residential-interior-design',
    subtitle: 'Private Residences, Penthouses & Coastal Villas',
    description:
      'Comprehensive interior architecture for private residences. We shape serene, light-filled homes where custom millwork, natural stone masonry, and collectible furniture coalesce into timeless living environments.',
    deliverables: [
      'Architectural space planning & 3D spatial massing',
      'Bespoke furniture, wardrobe & architectural millwork drawings',
      'Curated material boards (natural stone, timber, lime plasters, textiles)',
      'Architectural lighting design, art advisory & final styling',
    ],
    estimatedTimeline: '14 – 28 Weeks',
    image: {
      url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      publicId: 'demo/srv-residential',
      alt: 'Residential interior architecture',
    },
    displayOrder: 1,
    published: true,
  },
  {
    _id: 'srv-2',
    title: 'Commercial Interior Design',
    slug: 'commercial-interior-design',
    subtitle: 'Boutique Retail, Galleries, Hospitality & Private Clubs',
    description:
      'Editorial spatial identities for cultural institutions, flagship boutiques, and intimate hospitality venues that translate brand ethos into tactile architectural form.',
    deliverables: [
      'Brand-aligned spatial narrative & customer journey choreography',
      'Custom display plinths, sculptural reception counters & joinery',
      'Acoustic engineering, ambient hospitality lighting & signage integration',
      'Full MEP coordination & statutory compliance documentation',
    ],
    estimatedTimeline: '12 – 22 Weeks',
    image: {
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      publicId: 'demo/srv-commercial',
      alt: 'Commercial boutique interior',
    },
    displayOrder: 2,
    published: true,
  },
  {
    _id: 'srv-3',
    title: 'Modular Kitchen Design',
    slug: 'modular-kitchen-design',
    subtitle: 'Architectural Culinary Suites & Concealed Sculleries',
    description:
      'Precision-engineered culinary spaces combining European hardware ergonomics with monolithic stone islands, fluted timber cabinetry, and concealed wet-kitchen sculleries.',
    deliverables: [
      'Ergonomic culinary workflow & dual-kitchen zoning (Dry Island + Wet Scullery)',
      'Pocket-door appliance garages & integrated ventilation engineering',
      'Monolithic stone countertop detailing & heat/stain treatment specs',
      'Factory-precision modular carcass & hardware schedule',
    ],
    estimatedTimeline: '8 – 12 Weeks',
    image: {
      url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85',
      publicId: 'demo/srv-kitchen',
      alt: 'Bespoke modular kitchen design',
    },
    displayOrder: 3,
    published: true,
  },
  {
    _id: 'srv-4',
    title: 'Bedroom and Living Room Design',
    slug: 'bedroom-and-living-room-design',
    subtitle: 'Restorative Primary Suites & Formal Entertaining Salons',
    description:
      'Focused spatial transformations for primary bedrooms, dressing sanctuaries, and formal living rooms—prioritizing acoustic stillness, soft indirect lighting, and custom upholstery.',
    deliverables: [
      'Bespoke sofa, daybed & upholstered headboard fabrication drawings',
      'Walk-in wardrobe & dressing room compartmentalization',
      'Layered drapery, hand-knotted rugs & acoustic wall panelling',
      'Warm-dim circadian lighting scenes & bedside switching layouts',
    ],
    estimatedTimeline: '6 – 12 Weeks',
    image: {
      url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
      publicId: 'demo/srv-bedroom-living',
      alt: 'Warm minimalist bedroom and living design',
    },
    displayOrder: 4,
    published: true,
  },
  {
    _id: 'srv-5',
    title: 'Office Interiors',
    slug: 'office-interiors',
    subtitle: 'Executive Chambers, Family Offices & Creative Studios',
    description:
      'Refined workspaces that trade corporate sterility for the calm authority of a private collectors study—engineered for high-focus leadership and discreet client hosting.',
    deliverables: [
      'Acoustic boardroom & private executive chamber engineering (STC-50+)',
      'Custom timber boardroom tables with concealed AV & power management',
      'Ergonomic lighting, library shelving & hospitality pantry lounges',
      'Turnkey MEP, IT cabling & acoustic ceiling integration',
    ],
    estimatedTimeline: '10 – 18 Weeks',
    image: {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
      publicId: 'demo/srv-office',
      alt: 'Executive office interior architecture',
    },
    displayOrder: 5,
    published: true,
  },
  {
    _id: 'srv-6',
    title: 'Renovation and Remodeling',
    slug: 'renovation-and-remodeling',
    subtitle: 'Structural Reconfiguration & Heritage Apartment Conservation',
    description:
      'End-to-end architectural remodeling for older apartments and heritage villas—opening up compartmentalized layouts, upgrading concealed services, and restoring period craftsmanship.',
    deliverables: [
      'Structural wall removal feasibility & civil reconfiguration drawings',
      'Complete plumbing, electrical & concealed HVAC replacement',
      'Terrazzo, natural stone & heritage timber restoration',
      'Turnkey site supervision, quality audits & final handover',
    ],
    estimatedTimeline: '16 – 32 Weeks',
    image: {
      url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
      publicId: 'demo/srv-renovation',
      alt: 'Architectural renovation and remodeling',
    },
    displayOrder: 6,
    published: true,
  },
  {
    _id: 'srv-7',
    title: 'Space Planning and Consultation',
    slug: 'space-planning-and-consultation',
    subtitle: 'Architectural Feasibility, Layout Optimization & Material Direction',
    description:
      'Targeted architectural advisory for clients evaluating a property purchase or seeking master layout optimization, circulation clarity, and material direction prior to construction.',
    deliverables: [
      '3 alternative scaled architectural floor plan & furniture zoning options',
      'Daylight, cross-ventilation & sightline diagnostic study',
      'Core material, stone & palette specification dossier',
      'Preliminary elemental budget & contractor scope brief',
    ],
    estimatedTimeline: '3 – 5 Weeks',
    image: {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      publicId: 'demo/srv-planning',
      alt: 'Architectural space planning consultation',
    },
    displayOrder: 7,
    published: true,
  },
];

export const INITIAL_TESTIMONIALS = [
  {
    _id: 'test-1',
    clientName: 'Aarav & Meera Singhania (Demo Client Record)',
    projectType: 'Residential Interior Architecture — Malabar Hill',
    location: 'Mumbai',
    feedback:
      'Atelier Vera brought an extraordinary sense of stillness and proportion to our home. Every joinery shadow gap and limestone threshold feels timeless rather than trend-driven.',
    clientPhoto: {
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      publicId: 'demo/client-1',
    },
    isDemoContent: true,
    published: true,
    displayOrder: 1,
  },
  {
    _id: 'test-2',
    clientName: 'Vikramaditya Kapoor (Demo Client Record)',
    projectType: 'Executive Family Office — BKC',
    location: 'Mumbai',
    feedback:
      'We wanted our family office to feel like a quiet architectural study rather than a corporate floor. Elena and her team delivered a space of remarkable acoustic calm and craftsmanship.',
    clientPhoto: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      publicId: 'demo/client-2',
    },
    isDemoContent: true,
    published: true,
    displayOrder: 2,
  },
  {
    _id: 'test-3',
    clientName: 'Nandini & Rohan Kapur (Demo Client Record)',
    projectType: 'Modular Culinary Suite & Living Pavilion',
    location: 'Jor Bagh, New Delhi',
    feedback:
      'The pocket-door travertine kitchen transformation completely changed how our family hosts. Guests never realize a heavy working scullery sits right behind the fluted oak panelling.',
    clientPhoto: {
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      publicId: 'demo/client-3',
    },
    isDemoContent: true,
    published: true,
    displayOrder: 3,
  },
  {
    _id: 'test-4',
    clientName: 'Solène Laurent (Demo Client Record)',
    projectType: 'Maison Serein Commercial Atelier',
    location: 'Kala Ghoda, Mumbai',
    feedback:
      'Working within strict heritage conservation rules required genuine architectural ingenuity. Atelier Vera respected every historic basalt column while creating a luminous contemporary gallery.',
    clientPhoto: {
      url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      publicId: 'demo/client-4',
    },
    isDemoContent: true,
    published: true,
    displayOrder: 4,
  },
];

export const DESIGN_PROCESS_STAGES = [
  {
    step: '01',
    title: 'Initial Consultation',
    duration: 'Week 1',
    summary:
      'An unhurried dialogue at our studio or your site to discuss your architectural aspirations, spatial habits, timeline, and investment framework.',
    deliverables: ['Site & architectural potential review', 'Preliminary project charter', 'Scope & fee alignment'],
  },
  {
    step: '02',
    title: 'Understanding Requirements',
    duration: 'Weeks 2 – 3',
    summary:
      'Detailed laser measurement, structural and MEP diagnostics, daylight mapping, and deep lifestyle briefing with every member of the household or leadership team.',
    deliverables: ['Measured as-built CAD survey', 'Spatial adjacency & acoustic brief', 'Daylight & ventilation study'],
  },
  {
    step: '03',
    title: 'Concept Development',
    duration: 'Weeks 4 – 6',
    summary:
      'We establish the architectural narrative—translating proportion, light modulation, and spatial flow into cohesive volumetric studies and atmospheric references.',
    deliverables: ['Architectural concept dossier', 'Volumetric massing studies', 'Spatial circulation choreography'],
  },
  {
    step: '04',
    title: 'Space Planning & Material Selection',
    duration: 'Weeks 7 – 10',
    summary:
      'Locking in scaled furniture zoning alongside tactile physical sample boards of honed stones, sustainably harvested timbers, mineral plasters, and woven textiles.',
    deliverables: ['Finalized 1:50 master layout plans', 'Physical stone, timber & textile sample trays', 'Preliminary millwork & hardware schedules'],
  },
  {
    step: '05',
    title: 'Design Presentation',
    duration: 'Weeks 11 – 14',
    summary:
      'Comprehensive presentation of photorealistic architectural renders, full GFC (Good for Construction) technical drawings, lighting layouts, and itemized bill of quantities.',
    deliverables: ['High-resolution 3D architectural views', 'Complete GFC civil, MEP & joinery drawings', 'Itemized BOQ & tender documentation'],
  },
  {
    step: '06',
    title: 'Execution & Final Handover',
    duration: 'Weeks 15 – Handover',
    summary:
      'Rigorous site supervision, artisan workshop inspections, custom furniture placement, fine art hanging, and white-glove handover of your completed space.',
    deliverables: ['Weekly quality & site progress audits', 'Bespoke furniture & drapery installation', 'As-built dossier & care manual handover'],
  },
];

export const INITIAL_APPOINTMENTS = [
  {
    _id: 'appt-101',
    bookingReference: 'AV-9K2M-481A',
    consultationType: 'Full Residential Design Consultation (90 min)',
    preferredDate: '2026-11-24',
    timeSlot: '11:30',
    durationMinutes: 60,
    bufferMinutes: 30,
    timezone: 'Asia/Kolkata',
    clientName: 'Devika Nair (Demo Booking)',
    email: 'devika.nair@example.com',
    phone: '+91 98201 11223',
    projectType: 'Residential',
    location: 'Worli Sea Face, Mumbai',
    requirements: 'Full interior architecture for a 3,800 sq. ft. bare-shell apartment overlooking the sea.',
    status: 'confirmed',
    adminNotes: 'Floor plans received via email; Elena leading consultation.',
    createdAt: '2026-11-17T10:15:00.000Z',
  },
  {
    _id: 'appt-102',
    bookingReference: 'AV-7P4X-902B',
    consultationType: 'Kitchen & Millwork Bespoke Planning (60 min)',
    preferredDate: '2026-11-25',
    timeSlot: '15:30',
    durationMinutes: 60,
    bufferMinutes: 30,
    timezone: 'Asia/Kolkata',
    clientName: 'Siddharth Malhotra (Demo Booking)',
    email: 'siddharth.m@example.com',
    phone: '+91 98111 44556',
    projectType: 'Kitchen',
    location: 'Defence Colony, New Delhi',
    requirements: 'Looking to remodel our culinary and dining zone with a concealed wet kitchen and travertine island.',
    status: 'pending',
    adminNotes: 'Awaiting site photographs before confirmation.',
    createdAt: '2026-11-18T08:30:00.000Z',
  },
];

export const INITIAL_ENQUIRIES = [
  {
    _id: 'enq-201',
    name: 'Rhea & Karan Luthra (Demo Enquiry)',
    email: 'rhea.luthra@example.com',
    phone: '+91 98204 55667',
    projectType: 'Residential Interior Design',
    budgetRange: '₹1.5 Cr – ₹3.0 Cr',
    location: 'Koregaon Park, Pune',
    message:
      'We are acquiring a 4,200 sq. ft. duplex and admire Atelier Veras warm limestone and timber palette. Wed love to discuss a Q1 2027 design start.',
    status: 'new',
    adminNotes: '',
    createdAt: '2026-11-18T06:20:00.000Z',
  },
  {
    _id: 'enq-202',
    name: 'Arjun Sengupta (Demo Enquiry)',
    email: 'arjun@sengupta-ventures.example.com',
    phone: '+91 98300 77889',
    projectType: 'Office Interiors',
    budgetRange: '₹80L – ₹1.5 Cr',
    location: 'Lower Parel, Mumbai',
    message:
      'Seeking acoustic boardroom and private library-style office interiors for our 2,600 sq. ft. boutique advisory practice.',
    status: 'contacted',
    adminNotes: 'Introductory deck shared on 17 Nov.',
    createdAt: '2026-11-16T14:40:00.000Z',
  },
];

export const INITIAL_MEDIA = [
  {
    _id: 'med-1',
    title: 'Malabar Limestone Living Salon',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    publicId: 'atelier-vera/malabar-living',
    category: 'Residential',
    format: 'jpg',
    bytes: 412800,
  },
  {
    _id: 'med-2',
    title: 'Travertine & Fluted Oak Culinary Island',
    url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85',
    publicId: 'atelier-vera/travertine-kitchen',
    category: 'Kitchen',
    format: 'jpg',
    bytes: 389400,
  },
  {
    _id: 'med-3',
    title: 'Quiet Linen Primary Suite',
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
    publicId: 'atelier-vera/linen-bedroom',
    category: 'Bedroom',
    format: 'jpg',
    bytes: 356100,
  },
  {
    _id: 'med-4',
    title: 'Vanguard Executive Library',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    publicId: 'atelier-vera/vanguard-office',
    category: 'Office',
    format: 'jpg',
    bytes: 401200,
  },
];
