// routes/staff.routes.js
import express from "express";
import {
  getStaff,         
  getRoleSection,   
  updateRoleSection,
  deleteRoleSection
} from "../controllers/staff.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Get all staff
router.get("/", getStaff);


router.get("/:section", getRoleSection);


router.put("/:section", verifyToken, updateRoleSection);

router.delete("/deletestaff/:rolename", verifyToken, deleteRoleSection)
export default router;
