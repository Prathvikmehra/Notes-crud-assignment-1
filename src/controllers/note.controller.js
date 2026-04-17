const mongoose = require("mongoose");
const Note = require("../models/note.model");

// ─── Helper ───────────────────────────────────────────────
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
};
