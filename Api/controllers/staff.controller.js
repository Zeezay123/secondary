// import Staff from "../models/directory.modal.js";
// import { errorHandler } from "../utils/error.js";

// // Get all staff
// export const getStaff = async (req, res, next) => {
//   try {
//     const staffData = await Staff.findOne();
//     if (!staffData) {
//       return res.status(404).json({ message: "Staff data not found" });
//     }
//     res.status(200).json(staffData);
//   } catch (error) {
//     next(error);
//   }
// };

// // Get a specific role section (e.g., /api/staff/vc)
// export const getRoleSection = async (req, res, next) => {
//   try {
//     const roleName = req.params.section;
//     const staffData = await Staff.findOne();

//     if (!staffData) {
//       return res.status(404).json({ message: "Staff data not found" });
//     }

//     console.log("Available roles:", Object.keys(staffData.toObject()));

//     if (!staffData[roleName]) {
//       return res.status(404).json({
//         message: `Role '${roleName}' not found`,
//         availableRoles: Object.keys(staffData.toObject())
//       });
//     }

//     res.status(200).json(staffData[roleName]);
//   } catch (error) {
//     next(error);
//   }
// };

// // Update all staff data (admin only)
// export const updateStaff = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "You are not allowed to update staff data"));
//   }

//   try {
//     const staffData = await Staff.findOneAndUpdate(
//       {},
//       { $set: req.body },
//       { new: true, upsert: true } // create if not exist
//     );
//     res.status(200).json(staffData);
//   } catch (error) {
//     next(error);
//   }
// };

// // Update a specific role section
// export const updateRoleSection = async (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return next(errorHandler(403, "You are not allowed to update staff data"));
//   }

//   try {
//     const roleName = req.params.section;
//     const updateData = { [roleName]: req.body };

//     const staffData = await Staff.findOneAndUpdate(
//       {},
//       { $set: updateData },
//       { new: true, upsert: true }
//     );

//     res.status(200).json(staffData[roleName]);
//   } catch (error) {
//     next(error);
//   }
// };

import { db } from "../db.js";
import { errorHandler } from "../utils/error.js";


export const getStaff = (req, res, next) => {
  const query = "SELECT * FROM staff";
  db.query(query, (err, results) => {
    if (err) return next(err);

    if (results.length === 0) {
      return res.status(404).json({ message: "Staff data not found" });
    }

    res.status(200).json(results);
  });
};

//Get a specific role (e.g. /api/staff/vc)
export const getRoleSection = (req, res, next) => {
  const roleName = req.params.section; // vc, director, etc.
  const query = "SELECT * FROM staff WHERE role = ?";

  db.query(query, [roleName], (err, results) => {
    if (err) return next(err);

    if (results.length === 0) {
      return res.status(404).json({ message: `Role '${roleName}' not found` });
    }

    res.status(200).json(results[0]); // one row per role
  });
};

// Insert or update a role (Upsert)
export const updateRoleSection = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to update staff data"));
  }

  const roleName = req.params.section;
  const { name, post, email, description, photo } = req.body;

  const query = `
    INSERT INTO staff (role, name, post, email, description, photo)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      post = VALUES(post),
      email = VALUES(email),
      description = VALUES(description),
      photo = VALUES(photo),
      updated_at = CURRENT_TIMESTAMP
  `;

  db.query(query, [roleName, name, post, email, description, photo], (err) => {
    if (err) return next(err);
    res
      .status(200)
      .json({ message: `Staff for role '${roleName}' updated successfully` });
  });
};

// Delete a role
export const deleteRoleSection = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to delete staff data"));
  }

  const roleName = req.params.section;
  const query = "DELETE FROM staff WHERE role = ?";

  db.query(query, [roleName], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Role '${roleName}' not found` });
    }
    res
      .status(200)
      .json({ message: `Staff role '${roleName}' deleted successfully` });
  });
};
