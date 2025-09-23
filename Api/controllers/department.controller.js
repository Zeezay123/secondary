// import mongoose from "mongoose";
// import Department from "../models/depart.model.js";
// import Faculty from "../models/faculty.model.js";
// import { errorHandler } from "../utils/error.js";

// // Create Department
// export const createDepartment = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "Only admin can create a department"));
//   }

//   const { name, faculty, departimage, content } = req.body;
//   if (!name || !faculty) {
//     return next(errorHandler(400, "Department name and faculty are required"));
//   }

//   try {
//     let facultyId = faculty;

//     // If faculty is not an ObjectId, try finding it by name
//     if (!mongoose.Types.ObjectId.isValid(facultyId)) {
//       const facultyDoc = await Faculty.findOne({ name: facultyId.trim() });
//       if (!facultyDoc) {
//         return next(errorHandler(404, "Faculty not found"));
//       }
//       facultyId = facultyDoc._id; // replace with the actual ObjectId
//     }

//     const department = new Department({ 
//       name, 
//       faculty: facultyId,
//       departimage: departimage || '',
//       content: content || '',
//     });
//     const savedDepartment = await department.save();

//     res.status(201).json(savedDepartment);
//   } catch (error) {
//     next(error);
//   }
// };

// // Get all departments with courses
// export const getDepartments = async (req, res, next) => {
//   try {

//    if(req.params.id){
//     const department = await Department.findById(req.params.id)
//       .populate("faculty", "name")
//       .populate("courses")
//       .exec();

//    if(!department){
//   return res.status(400).json({message:'Department not found'})
// }


//   return res.status(200).json(department);
    
//    }


//     const departments = await Department.find()
//       .populate("faculty", "name")
//       .populate("courses")
//       .exec();

//     res.status(200).json(departments);
//   } catch (error) {
//     next(error);
//   }
// };

// // Update Department
// export const updateDepartment = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "Only admin can update a department"));
//   }

//   try {
//     const updatedDepartment = await Department.findByIdAndUpdate(
//       req.params.departmentId,
//       { $set: req.body },
//       { new: true }
//     );

//     if (!updatedDepartment) {
//       return next(errorHandler(404, "Department not found"));
//     }

//     res.status(200).json(updatedDepartment);
//   } catch (error) {
//     next(error);
//   }
// };

// // Delete Department
// export const deleteDepartment = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "Only admin can delete a department"));
//   }

//   try {
//     const deleted = await Department.findByIdAndDelete(req.params.departmentId);
//     if (!deleted) {
//       return next(errorHandler(404, "Department not found"));
//     }
//     res.status(200).json({ message: "Department deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

import { db } from "../db.js";
import { errorHandler } from "../utils/error.js";

//Create Department
export const createDepartment = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can create a department"));
  }

  const { name, faculty, departimage, content } = req.body;

  if (!name || !faculty) {
    return next(errorHandler(400, "Department name and faculty are required"));
  }

  // Step 1: Get faculty id by name
  db.query("SELECT id FROM faculty WHERE name = ?", [faculty.trim()], (err, facultyRow) => {
    if (err) return next(err);
    if (!facultyRow || facultyRow.length === 0) {
      return next(errorHandler(404, "Faculty not found"));
    }

    const facultyId = facultyRow[0].id;


    const insertQuery = `
      INSERT INTO depart (name, faculty_id, departimage, content)
      VALUES (?, ?, ?, ?)
    `;

    db.query(insertQuery, [name, facultyId, departimage || "", content || ""], (err, result) => {
      if (err) return next(err);

      db.query(
        `SELECT d.*, f.name AS faculty_name
         FROM depart d
         JOIN faculty f ON d.faculty_id = f.id
         WHERE d.id = ?`,
        [result.insertId],
        (err, newDepartment) => {
          if (err) return next(err);
          res.status(201).json(newDepartment[0]);
        }
      );
    });
  });
};


export const getDepartments = (req, res, next) => {
  let sql = `
    SELECT d.id, d.name, d.departimage, d.content, d.created_at, d.updated_at,
           f.name AS faculty_name
    FROM depart d
    JOIN faculty f ON d.faculty_id = f.id
  `;
  const params = [];

  if (req.params.id) {
    sql += " WHERE d.id = ?";
    params.push(req.params.id);
  }

  db.query(sql, params, (err, results) => {
    if (err) return next(err);

    if (req.params.id && results.length === 0) {
      return next(errorHandler(404, "Department not found"));
    }

    const formatted = results.map(r => ({
      id: r.id,
      name: r.name,
      departimage: r.departimage,
      content: r.content,
      created_at: r.created_at,
      updated_at: r.updated_at,
      faculty: r.faculty_name, 
    }));

    res.status(200).json(req.params.id ? formatted[0] : formatted);
  });
};

// Update Department
export const updateDepartment = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can update a department"));
  }

  const { name, faculty, departimage, content } = req.body;

  // Step 1: Get faculty id by name
  db.query("SELECT id FROM faculty WHERE name = ?", [faculty.trim()], (err, facultyRow) => {
    if (err) return next(err);
    if (!facultyRow || facultyRow.length === 0) {
      return next(errorHandler(404, "Faculty not found"));
    }

    const facultyId = facultyRow[0].id;

    // Step 2: Update department
    const updateQuery = `
      UPDATE depart
      SET name = ?, faculty_id = ?, departimage = ?, content = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    db.query(updateQuery, [name, facultyId, departimage || "", content || "", req.params.departmentId], (err, result) => {
      if (err) return next(err);

      if (result.affectedRows === 0) {
        return next(errorHandler(404, "Department not found"));
      }

      res.status(200).json({ message: "Department updated successfully" });
    });
  });
};


export const deleteDepartment = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "Only admin can delete a department"));
  }

  const deleteQuery = "DELETE FROM depart WHERE id = ?";

  db.query(deleteQuery, [req.params.departmentId], (err, result) => {
    if (err) return next(err);

    if (result.affectedRows === 0) {
      return next(errorHandler(404, "Department not found"));
    }

    res.status(200).json({ message: "Department deleted successfully" });
  });
};
