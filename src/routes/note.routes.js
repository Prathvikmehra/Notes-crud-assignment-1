const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");

// IMPORTANT: /bulk routes MUST come before /:id to avoid "bulk" being treated as a MongoDB ObjectId

// POST
router.post("/bulk", noteController.bulkCreateNotes);
router.post("/", noteController.createNote);

// GET
router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNoteById);

// PUT & PATCH
router.put("/:id", noteController.replaceNote);
router.patch("/:id", noteController.updateNote);

// DELETE
router.delete("/bulk", noteController.bulkDeleteNotes);
router.delete("/:id", noteController.deleteNote);

module.exports = router;
