const mongoose = require("mongoose");
const Note = require("../models/note.model");

// ─── Helper ───────────────────────────────────────────────
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// ─── 1. POST /api/notes — Create a single note ────────────
const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null,
      });
    }

    const note = await Note.create({ title, content, category, isPinned });

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// ─── 2. POST /api/notes/bulk — Create multiple notes ──────
const bulkCreateNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "notes array is required and must not be empty",
        data: null,
      });
    }

    const created = await Note.insertMany(notes);

    return res.status(201).json({
      success: true,
      message: `${created.length} notes created successfully`,
      data: created,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// ─── 3. GET /api/notes — Get all notes ────────────────────
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message, data: null });
  }
};

// ─── 4. GET /api/notes/:id — Get note by ID ───────────────
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ObjectId", data: null });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found", data: null });
    }

    return res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message, data: null });
  }
};

module.exports = {
  createNote,
  bulkCreateNotes,
  getAllNotes,
  getNoteById,
};
