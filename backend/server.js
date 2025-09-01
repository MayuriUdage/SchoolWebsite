const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/schoolImages", express.static("schoolImages"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       
  password: "Mayuri@123",       
  database: "schooldb"
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "schoolImages"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.post("/api/addSchool", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?,?,?,?,?,?,?)";
  db.query(sql, [name, address, city, state, contact, email_id, image], (err) => {
    if (err) {
      console.error("❌ MySQL Insert Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "School added successfully" });
  });
});


app.get("/api/schools", (req, res) => {
  db.query("SELECT * FROM schools", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

app.delete("/api/schools/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM schools WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "School deleted successfully" });
  });
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
