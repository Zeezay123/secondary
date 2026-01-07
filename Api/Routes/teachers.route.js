import express from "express";
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teachers.controller.js";

const router = express.Router();

router.post("/create", createTeacher);
router.get("/", getTeachers);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

export default router;
