
import { db } from "../db.js";
import { errorHandler } from "../utils/error.js";

// Get content by title
export const getContent = (req, res, next) => {
  const query = "SELECT * FROM content WHERE title = ?";
  db.query(query, [req.params.title], (err, results) => {
    if (err) return next(err);
    if (results.length === 0) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(results[0]);
  });
};

// Get all content blocks
export const getAllContent = (req, res, next) => {
  const query = "SELECT * FROM content ORDER BY id ASC";
  db.query(query, (err, results) => {
    if (err) return next(err);
    res.status(200).json(results);
  });
};

// Create a new content block
export const createContent = (req, res, next) => {
  const { title, subtitle, content, image } = req.body;
  const query =
    "INSERT INTO content (title, subtitle, content, image) VALUES (?, ?, ?, ?)";
  db.query(query, [title, subtitle, content, image], (err, result) => {
    if (err) return next(err);
    res.status(201).json({
      id: result.insertId,
      title,
      subtitle,
      content,
      image,
    });
  });
};

// Update content block by title
export const updateContent = (req, res, next) => {
  const { subtitle, content, image } = req.body;
  const query =
    "UPDATE content SET subtitle = ?, content = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE title = ?";
  db.query(query, [subtitle, content, image, req.params.title], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json({ message: "Content updated successfully" });
  });
};

// Delete content block by title
export const deleteContent = (req, res, next) => {
  const query = "DELETE FROM content WHERE title = ?";
  db.query(query, [req.params.title], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json({ message: "Content deleted successfully" });
  });
};
