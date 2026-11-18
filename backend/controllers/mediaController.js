const MediaAsset = require('../models/MediaAsset');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// GET /api/media (Admin)
const getMediaAssets = async (req, res, next) => {
  try {
    const assets = await MediaAsset.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: assets.length,
      assets,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/media/upload (Admin - Multipart file upload to Cloudinary)
const uploadMediaAssets = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      res.status(400);
      throw new Error('Please select at least one image file to upload');
    }

    const category = req.body.category || 'Portfolio';
    const uploadedDocs = [];

    for (const file of req.files) {
      const result = await uploadBufferToCloudinary(file.buffer);
      const asset = await MediaAsset.create({
        title: req.body.title || file.originalname.replace(/\.[^/.]+$/, ''),
        url: result.url,
        publicId: result.publicId,
        category,
        format: result.format,
        bytes: result.bytes,
        width: result.width,
        height: result.height,
      });
      uploadedDocs.push(asset);
    }

    res.status(201).json({
      success: true,
      message: `${uploadedDocs.length} image(s) uploaded to Cloudinary`,
      assets: uploadedDocs,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/media/:id (Admin)
const deleteMediaAsset = async (req, res, next) => {
  try {
    const asset = await MediaAsset.findById(req.params.id);
    if (!asset) {
      res.status(404);
      throw new Error('Media asset not found');
    }

    await deleteFromCloudinary(asset.publicId);
    await asset.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Media asset deleted from Cloudinary and database',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMediaAssets,
  uploadMediaAssets,
  deleteMediaAsset,
};
