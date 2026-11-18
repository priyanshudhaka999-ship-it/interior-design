const WebsiteSettings = require('../models/WebsiteSettings');

// GET /api/settings (Public & Admin)
const getWebsiteSettings = async (req, res, next) => {
  try {
    let settings = await WebsiteSettings.findOne({ singletonKey: 'default_settings' });
    if (!settings) {
      settings = await WebsiteSettings.create({ singletonKey: 'default_settings' });
    }
    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/settings (Admin)
const updateWebsiteSettings = async (req, res, next) => {
  try {
    let settings = await WebsiteSettings.findOne({ singletonKey: 'default_settings' });
    if (!settings) {
      settings = new WebsiteSettings({ singletonKey: 'default_settings' });
    }

    const allowedTopFields = [
      'isDemoConfiguration',
      'studioName',
      'studioTagline',
      'logoText',
      'logoUrl',
      'heroHeadline',
      'heroIntroduction',
      'heroImageUrl',
      'phone',
      'email',
      'whatsappNumber',
      'instagramUrl',
      'instagramHandle',
      'address',
      'businessHours',
      'googleMapsEmbedUrl',
      'footerNote',
      'bookingConfig',
      'instagramShowcase',
    ];

    allowedTopFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });

    await settings.save();
    res.status(200).json({
      success: true,
      message: 'Website content & studio configuration saved',
      settings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWebsiteSettings,
  updateWebsiteSettings,
};
