const { validationResult } = require('express-validator');
const Project = require('../models/Project');
const { deleteFromCloudinary } = require('../config/cloudinary');

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// GET /api/projects (Public: published only unless admin query)
const getProjects = async (req, res, next) => {
  try {
    const { category, featured, includeUnpublished } = req.query;
    const filter = {};

    if (!(includeUnpublished === 'true' && req.admin)) {
      filter.published = true;
    }
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (featured === 'true') {
      filter.featured = true;
    }

    const projects = await Project.find(filter).sort({
      displayOrder: 1,
      completionYear: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:slugOrId
const getProjectBySlugOrId = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    let project = await Project.findOne({ slug: slugOrId });
    if (!project && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(slugOrId);
    }

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    const relatedProjects = await Project.find({
      _id: { $ne: project._id },
      published: true,
      category: project.category,
    })
      .limit(3)
      .sort({ completionYear: -1 });

    res.status(200).json({
      success: true,
      project,
      relatedProjects,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects (Admin)
const createProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array().map((e) => e.msg).join(', '));
    }

    const payload = { ...req.body };
    payload.slug = payload.slug ? slugify(payload.slug) : slugify(payload.title);

    const existing = await Project.findOne({ slug: payload.slug });
    if (existing) {
      payload.slug = `${payload.slug}-${Date.now().toString(36).slice(-4)}`;
    }

    const project = await Project.create(payload);
    res.status(201).json({
      success: true,
      message: 'Project created',
      project,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id (Admin)
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    const updates = { ...req.body };
    if (updates.title && !updates.slug) {
      updates.slug = slugify(updates.title);
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Project updated',
      project: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id (Admin)
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    // Safely clean up associated Cloudinary assets
    const publicIds = [];
    if (project.coverImage?.publicId) publicIds.push(project.coverImage.publicId);
    if (Array.isArray(project.gallery)) {
      project.gallery.forEach((img) => {
        if (img.publicId) publicIds.push(img.publicId);
      });
    }
    if (project.beforeAfter?.beforeImage?.publicId) {
      publicIds.push(project.beforeAfter.beforeImage.publicId);
    }
    if (project.beforeAfter?.afterImage?.publicId) {
      publicIds.push(project.beforeAfter.afterImage.publicId);
    }

    await Promise.all(publicIds.map((pid) => deleteFromCloudinary(pid)));
    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project and associated cloud media assets deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectBySlugOrId,
  createProject,
  updateProject,
  deleteProject,
};
