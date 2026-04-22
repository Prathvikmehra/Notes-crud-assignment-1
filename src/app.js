const express = require("express");
const noteRoutes = require("./routes/note.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Notes API is running 🚀",
    endpoints: {
      getAllNotes: "GET /api/notes",
      getNoteById: "GET /api/notes/:id",
      createNote: "POST /api/notes",
      updateNote: "PUT /api/notes/:id",
      deleteNote: "DELETE /api/notes/:id",
    },
  });
});

app.use("/api/notes", noteRoutes);



module.exports = app;
