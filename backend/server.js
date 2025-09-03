const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/schoolImages", express.static("schoolImages"));

const db = new sqlite3.Database("./schooldb.sqlite", (err) => {
  if (err) console.error("DB connection error:", err);
  else console.log("Connected to SQLite database");
});

db.run(`
  CREATE TABLE IF NOT EXISTS schools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact TEXT NOT NULL,
    email_id TEXT NOT NULL,
    image TEXT
  )
`);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "schoolImages"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.post("/api/addSchool", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null;

  db.run(
    `INSERT INTO schools (name, address, city, state, contact, email_id, image)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, address, city, state, contact, email_id, image],
    function (err) {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "School added successfully", id: this.lastID });
    }
  );
});

app.get("/api/schools", (req, res) => {
  db.all("SELECT * FROM schools", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.delete("/api/schools/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM schools WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "School deleted successfully" });
  });
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
