// import Faculty from "../models/faculty.model.js";
// import { errorHandler } from "../utils/error.js";

// // Create Faculty
// export const createFaculty = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "Only admin can create a faculty"));
//   }

//   if (!req.body.name) {
//     return next(errorHandler(400, "Faculty name is required"));
//   }

//   try {
//     const faculty = new Faculty({ name: req.body.name });
//     const savedFaculty = await faculty.save();
//     res.status(201).json(savedFaculty);
//   } catch (error) {
//     next(error);
//   }
// };

// // Get all faculties with departments & courses
// export const getFaculty = async (req, res, next) => {
//   try {
//     const faculties = await Faculty.find()
//       .populate({
//         path: "departments",
//         populate: { path: "courses" },
//       })
//       .exec();

//     res.status(200).json(faculties);
//   } catch (error) {
//     next(error);
//   }
// };

// // Update faculty
// export const updateFaculty = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "Only admin can update a faculty"));
//   }

//   try {
//     const updatedFaculty = await Faculty.findByIdAndUpdate(
//       req.params.facultyId,
//       { $set: { name: req.body.name } },
//       { new: true }
//     );

//     if (!updatedFaculty) {
//       return next(errorHandler(404, "Faculty not found"));
//     }

//     res.status(200).json(updatedFaculty);
//   } catch (error) {
//     next(error);
//   }
// };

// // Delete faculty
// export const deleteFaculty = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "Only admin can delete a faculty"));
//   }

//   try {
//     const deleted = await Faculty.findByIdAndDelete(req.params.facultyId);
//     if (!deleted) {
//       return next(errorHandler(404, "Faculty not found"));
//     }
//     res.status(200).json({ message: "Faculty deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

import { db } from "../db.js";
import { errorHandler } from "../utils/error.js";

// Create Faculty
export const createFaculty = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can create a faculty"));
  }

  const { name } = req.body;
  if (!name) {
    return next(errorHandler(400, "Faculty name is required"));
  }

  const insertQuery = `INSERT INTO faculty (name) VALUES (?)`;

  db.query(insertQuery, [name], (err, result) => {
    if (err) return next(err);

    res.status(201).json({
      id: result.insertId,
      name,
      message: "Faculty created successfully",
    });
  });
};

// Get all faculties with departments & courses
export const getFaculty = (req, res, next) => {
  const query = `
    SELECT f.id AS faculty_id, f.name AS faculty_name,
           d.id AS department_id, d.name AS department_name,
           c.id AS course_id, c.name AS course_name, c.code, c.semesters
    FROM faculty f
    LEFT JOIN depart d ON f.id = d.faculty_id
    LEFT JOIN course c ON d.id = c.depart_id
    ORDER BY f.name, d.name, c.name
  `;

  db.query(query, (err, rows) => {
    if (err) return next(err);

    // Re-shape result into nested structure
    const faculties = {};
    rows.forEach(row => {
      if (!faculties[row.faculty_id]) {
        faculties[row.faculty_id] = {
          id: row.faculty_id,
          name: row.faculty_name,
          departments: [],
        };
      }

      if (row.department_id) {
        let department = faculties[row.faculty_id].departments.find(
          d => d.id === row.department_id
        );

        if (!department) {
          department = {
            id: row.department_id,
            name: row.department_name,
            courses: [],
          };
          faculties[row.faculty_id].departments.push(department);
        }

        if (row.course_id) {
          department.courses.push({
            id: row.course_id,
            name: row.course_name,
            code: row.code,
            semester: row.semester,
          });
        }
      }
    });

    res.status(200).json(Object.values(faculties));
  });
};

// Update faculty
export const updateFaculty = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can update a faculty"));
  }

  const { name } = req.body;
  const updateQuery = `UPDATE faculty SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;

  db.query(updateQuery, [name, req.params.facultyId], (err, result) => {
    if (err) return next(err);

    if (result.affectedRows === 0) {
      return next(errorHandler(404, "Faculty not found"));
    }

    res.status(200).json({ message: "Faculty updated successfully" });
  });
};

// Delete faculty
export const deleteFaculty = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can delete a faculty"));
  }

  const deleteQuery = `DELETE FROM faculty WHERE id = ?`;

  db.query(deleteQuery, [req.params.facultyId], (err, result) => {
    if (err) return next(err);

    if (result.affectedRows === 0) {
      return next(errorHandler(404, "Faculty not found"));
    }

    res.status(200).json({ message: "Faculty deleted successfully" });
  });
};
