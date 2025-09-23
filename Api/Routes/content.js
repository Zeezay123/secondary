import express from "express";
import {
  getContent,
  getAllContent,
  createContent,
  updateContent,
  deleteContent,
} from "../controllers/content.controller.js";

const router = express.Router();

router.get("/", getAllContent);          // Get all content blocks
router.get("/:title", getContent);       // Get content by title
router.post("/create", createContent);         // Create new content block
router.put("/:title", updateContent);    // Update content by title
router.delete("/:title", deleteContent); // Delete content by title

export default router;
