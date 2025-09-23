// import Course from "../models/course.model.js";
// import Department from "../models/depart.model.js";
// import Faculty from "../models/faculty.model.js";
// import { errorHandler } from "../utils/error.js";
// import mongoose from "mongoose";

// // Create Course
// export const createCourse = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "Only admin can create a course"));
//   }

//   const { name, code, semester, department, faculty,  description = "",
//       credits = 3 } = req.body;
//   if (!name || !code || !semester || !department || !faculty) {
//     return next(errorHandler(400, "Missing required fields"));
//   }

//   try {

//     let departmentId = req.body.department
//     if(!mongoose.Types.ObjectId.isValid(departmentId)){
//     const deptExists = await Department.findOne({name:department.trim()});
//     if (!deptExists) {
//       return next(errorHandler(404, "Department not found"));
//     }

//     departmentId = deptExists._id

// }
//    let facultyId = req.body.faculty
//    if(!mongoose.Types.ObjectId.isValid(facultyId)){
//     const facultyExists = await Faculty.findOne({name:faculty.trim()});
//     if (!facultyExists) {
//       return next(errorHandler(404, "Faculty not found"));
//     }

//     facultyId = facultyExists._id
//    }
//     const course = new Course({
//       name,
//       code,
//       semester,
//       description: description || "",
//       credits: credits || 3,
//       department: departmentId,
//       faculty: facultyId
//     });


//     const savedCourse = await course.save();
//     res.status(201).json(savedCourse);
//   } catch (error) {
//     next(error);
//   }
// };

// // Get all courses
// export const getCourse = async (req, res, next) => {
//   try {
//     const courses = await Course.find()
//       .populate("faculty", "name")
//       .populate("department", "name")
//       .exec();

//     res.status(200).json(courses);
//   } catch (error) {
//     next(error);
//   }
// };

// // Update Course
// export const updateCourse = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "Only admin can update a course"));
//   }

//   try {
//     const updatedCourse = await Course.findByIdAndUpdate(
//       req.params.courseId,
//       { $set: req.body },
//       { new: true }
//     );

//     if (!updatedCourse) {
//       return next(errorHandler(404, "Course not found"));
//     }

//     res.status(200).json(updatedCourse);
//   } catch (error) {
//     next(error);
//   }
// };

// // Delete Course
// export const deleteCourse = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "Only admin can delete a course"));
//   }

//   try {
//     const deleted = await Course.findByIdAndDelete(req.params.courseId);
//     if (!deleted) {
//       return next(errorHandler(404, "Course not found"));
//     }
//     res.status(200).json({ message: "Course deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

import { db } from "../db.js";
import { errorHandler } from "../utils/error.js";

// Create Course
export const createCourse = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can create a course"));
  }

  const { name, code, semester, description, credits, department, faculty } = req.body;

  if (!name || !code || !semester || !department || !faculty) {
    return next(errorHandler(400, "Missing required fields"));
  }

  // Get faculty_id
  db.query("SELECT id FROM faculty WHERE name = ?", [faculty], (err, facultyRows) => {
    if (err) return next(err);
    if (facultyRows.length === 0) return next(errorHandler(404, "Faculty not found"));
    const faculty_id = facultyRows[0].id;

    // Get depart_id
    db.query("SELECT id FROM depart WHERE name = ?", [department], (err, departRows) => {
      if (err) return next(err);
      if (departRows.length === 0) return next(errorHandler(404, "Department not found"));
      const depart_id = departRows[0].id;

      // Insert course
      const insertQuery = `
        INSERT INTO course (name, code, semesters, description, credits, depart_id, faculty_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [name, code, semester, description || "describe your course", credits || 3, depart_id, faculty_id],
        (err, result) => {
          if (err) return next(err);
          res.status(201).json({
            message: "Course created successfully",
            courseId: result.insertId,
          });
        }
      );
    });
  });
};

// Get All Courses (with faculty & department names)
export const getCourse = (req, res, next) => {
  const selectQuery = `
    SELECT c.id, c.name, c.code, c.semesters, c.description, c.credits, 
           c.created_at, c.updated_at,
           f.name AS faculty_name, d.name AS department_name
    FROM course c
    JOIN faculty f ON c.faculty_id = f.id
    JOIN depart d ON c.depart_id = d.id
    ORDER BY c.updated_at DESC
  `;

  db.query(selectQuery, (err, data) => {
    if (err) return next(err);
    res.status(200).json(data);
  });
};

// Update Course
export const updateCourse = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can update a course"));
  }

  const { name, code, semester, description, credits, department_name, faculty_name } = req.body;

  if (!department_name || !faculty_name) {
    return next(errorHandler(400, "Department and faculty names are required"));
  }

  // Get faculty_id
  db.query("SELECT id FROM faculty WHERE name = ?", [faculty_name], (err, facultyRows) => {
    if (err) return next(err);
    if (facultyRows.length === 0) return next(errorHandler(404, "Faculty not found"));
    const faculty_id = facultyRows[0].id;

    // Get depart_id
    db.query("SELECT id FROM depart WHERE name = ?", [department_name], (err, departRows) => {
      if (err) return next(err);
      if (departRows.length === 0) return next(errorHandler(404, "Department not found"));
      const depart_id = departRows[0].id;

      // Update course
      const updateQuery = `
        UPDATE course
        SET name = ?, code = ?, semesters = ?, description = ?, credits = ?, 
            depart_id = ?, faculty_id = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

      db.query(
        updateQuery,
        [name, code, semester, description, credits, depart_id, faculty_id, req.params.courseId],
        (err, result) => {
          if (err) return next(err);
          if (result.affectedRows === 0) {
            return next(errorHandler(404, "Course not found"));
          }
          res.status(200).json({ message: "Course updated successfully" });
        }
      );
    });
  });
};

// Delete Course
export const deleteCourse = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can delete a course"));
  }

  const deleteQuery = `DELETE FROM course WHERE id = ?`;

  db.query(deleteQuery, [req.params.courseId], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return next(errorHandler(404, "Course not found"));
    }
    res.status(200).json({ message: "Course deleted successfully" });
  });
};
