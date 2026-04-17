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

module.exports = {
  createNote,
};
