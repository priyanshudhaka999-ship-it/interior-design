const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadBufferToCloudinary = (buffer, folder = process.env.CLOUDINARY_FOLDER || 'atelier-vera') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto:good', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
        });
      }
    );
    stream.end(buffer);
  });
};

const deleteFromCloudinary = async (publicId) => {
  if (!publicId || publicId.startsWith('demo/')) {
    return { result: 'skipped_demo_asset' };
  }
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(`Failed to delete Cloudinary asset ${publicId}:`, error.message);
    return { result: 'error', message: error.message };
  }
};

module.exports = {
  cloudinary,
  uploadBufferToCloudinary,
  deleteFromCloudinary,
};
