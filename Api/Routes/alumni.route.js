import express from "express";
import {
  createAlumni,
  getAlumni,
  getAlumniById,
  updateAlumni,
  deleteAlumni,
} from "../controllers/alumni.controller.js";

const router = express.Router();

router.post("/create", createAlumni);
router.get("/", getAlumni);
router.get("/:id", getAlumniById);
router.put("/:id", updateAlumni);
router.delete("/:id", deleteAlumni);

export default router;
