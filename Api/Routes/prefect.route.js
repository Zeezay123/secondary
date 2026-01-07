import express from "express";
import {
  createPrefect,
  getPrefects,
  getPrefectById,
  updatePrefect,
  deletePrefect,
} from "../controllers/prefect.controller.js";

const router = express.Router();

router.post("/create", createPrefect);
router.get("/", getPrefects);
router.get("/:id", getPrefectById);
router.put("/:id", updatePrefect);
router.delete("/:id", deletePrefect);

export default router;
