// routes/announce.routes.js
import express from "express";
import {
  create,
  deleteAnnounce,
  getAnnounce,
  getAnnounceById,
  updateAnnounce,
} from "../controllers/announce.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Get the announcement (public)
router.get("/getAnnounce", getAnnounce);
router.get("/getAnnounce/:id", getAnnounceById);

// Create new announcement (admin only)
router.post("/createannounce", create);

// Update the announcement (admin only)
router.put("/updateannouce/:id", updateAnnounce);
router.delete("/deleteannounce/:id", deleteAnnounce);

export default router;
