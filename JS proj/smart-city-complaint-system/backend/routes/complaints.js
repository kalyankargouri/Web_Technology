const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all complaints
router.get("/", (req, res) => {
  db.query("SELECT * FROM complaints", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Database error");
    }
    res.json(result);
  });
});

// ADD complaint
router.post("/", (req, res) => {
  const { title, description, category, location, status } = req.body;

  const sql = `
    INSERT INTO complaints (title, description, category, location, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, description, category, location, status], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err); // 👈 important
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Complaint added" });
  });
});

// UPDATE status
router.put("/:id", (req, res) => {
  const sql = "UPDATE complaints SET status=? WHERE id=?";

  db.query(sql, [req.body.status, req.params.id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error updating");
    }
    res.json({ message: "Updated successfully" });
  });
});

// DELETE complaint
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM complaints WHERE id=?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting");
    }
    res.json({ message: "Deleted successfully" });
  });
});

module.exports = router;