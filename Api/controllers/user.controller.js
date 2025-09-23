// import { errorHandler } from "../utils/error.js";
// import bcryptjs from "bcryptjs";
// import User from "../models/user.model.js";

// // Test endpoint to verify API is working
// export const test = (req, res, next) => {
//     try {
//         res.json({ message: 'Test route is working' })
//     } catch (error) {
//         next(error);
//     }
// }

// // Update user profile (users can only update their own profile)
// export const updateUser = async (req, res, next) => {
//     // Authorization check
//     if (req.user.id !== req.params.userId) {
//         return next(errorHandler(403, 'You are not allowed to update this user'))
//     }

//     // Password validation and hashing
//     if (req.body.password) {
//         if (req.body.password.length < 6) {
//             return next(errorHandler(400, 'Password must be at least 6 characters'))
//         }
//         req.body.password = bcryptjs.hashSync(req.body.password, 10)
//     }

//     // Username validation
//     if (req.body.username) {
//         if (req.body.username.length < 7 || req.body.username.length > 20) {
//             return next(errorHandler(400, 'Username must be between 7 and 20 characters'))
//         }
//         if (req.body.username.includes(' ')) {
//             return next(errorHandler(400, 'Username cannot contain spaces'));
//         }
//         if (req.body.username !== req.body.username.toLowerCase()) {
//             return next(errorHandler(400, 'Username must be lowercase'));
//         }
//         if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
//             return next(errorHandler(400, 'Username can only contain letters and numbers'));
//         }
//     }

//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
//             $set: {
//                 username: req.body.username,
//                 email: req.body.email,
//                 profilePhoto: req.body.profilePhoto,
//                 password: req.body.password,
//             },
//         }, { new: true })

//         const { password, ...rest } = updatedUser._doc;
//         res.status(200).json(rest)

//     } catch (error) {
//         next(error)
//     }
// }

// // Delete user account (users can only delete their own account)
// export const deleteUser = async (req, res, next) => {
//     if (!req.user.isAdmin && req.user.id !== req.params.userId) {
//         return next(errorHandler(403, 'You are not allowed to delete the user'))
//     }
 
//     try {
//         await User.findByIdAndDelete(req.params.userId)
//         res.status(200).json('User has been deleted')
//     } catch (error) {
//         next(error)
//     }
// }

// // Sign out user by clearing authentication cookie
// export const signout = (req, res, next) => {
//     try {
//         res.clearCookie('access_token').status(200).json('User Signed Out')
//     } catch (error) {
//         next(error)
//     }
// }

// // Get all users with pagination (admin only)
// export const getUsers = async (req, res, next) => {
//     // Check if user is admin
//     if (!req.user || !req.user.isAdmin) {
//         return next(errorHandler(403, 'You are not allowed to see all users'))
//     }

//     try {
//         console.log('getUsers called with query:', req.query);
        
//         const startIndex = parseInt(req.query.startIndex) || 0;
//         const limit = parseInt(req.query.limit) || 5;
//         const sortDirection = req.query.sort === 'asc' ? 1 : -1;

//         const users = await User.find()
//             .sort({ createdAt: sortDirection })
//             .skip(startIndex)
//             .limit(limit);

//         // Remove password from all users before sending
//         const usersWithoutPassword = users.map((user) => {
//             const { password, ...rest } = user._doc;
//             return rest;
//         });

//         const totalUsers = await User.countDocuments();

//         const now = new Date();
//         const oneMonthAgo = new Date(
//             now.getFullYear(),
//             now.getMonth() - 1,
//             now.getDate()
//         );

//         const lastMonthUsers = await User.countDocuments({
//             createdAt: { $gte: oneMonthAgo },
//         });

//         const response = {
//             users: usersWithoutPassword,
//             totalUsers,
//             lastMonthUsers,
//         };

//         console.log('Sending users response:', response);
//         res.status(200).json(response);

//     } catch (error) {
//         console.error('Error in getUsers:', error);
//         next(error);
//     }
// }

import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import {db} from "../db.js";

// Test endpoint
export const test = (req, res, next) => {
  try {
    res.json({ message: "Test route is working" });
  } catch (error) {
    next(error);
  }
};

// Update user
export const updateUser = (req, res, next) => {
  if (req.user.id !== parseInt(req.params.userId)) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  // Password validation and hashing
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  // Username validation
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(errorHandler(400, "Username must be between 7 and 20 characters"));
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, "Username can only contain letters and numbers"));
    }
  }

  const { username, email, profilePhoto, password } = req.body;

  const query = `
    UPDATE users
    SET username = ?, email = ?, profilePic = ?, password = ?
    WHERE id = ?
  `;

  db.query(query, [username, email, profilePhoto, password, req.params.userId], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json("User not found");
    }
    res.status(200).json({ message: "User updated successfully" });
  });
};

// Delete user
export const deleteUser = (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== parseInt(req.params.userId)) {
    return next(errorHandler(403, "You are not allowed to delete the user"));
  }

  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [req.params.userId], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0) {
      return res.status(404).json("User not found");
    }
    res.status(200).json("User has been deleted");
  });
};

// Signout
export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("User Signed Out");
  } catch (error) {
    next(error);
  }
};

// Get all users (admin only, with pagination)
export const getUsers = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));
  }

  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 5;
  const sortDirection = req.query.sort === "asc" ? "ASC" : "DESC";

  const query = `
    SELECT id, username, email, profilePic, isAdmin, createdAt
    FROM users
    ORDER BY createdAt ${sortDirection}
    LIMIT ?, ?
  `;

  db.query(query, [startIndex, limit], (err, users) => {
    if (err) return next(err);

    // Get total users
    db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, totalData) => {
      if (err) return next(err);
      const totalUsers = totalData[0].totalUsers;

      // Users created in the last month
      db.query(
        "SELECT COUNT(*) AS lastMonthUsers FROM users WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 1 MONTH)",
        (err, lastMonthData) => {
          if (err) return next(err);
          const lastMonthUsers = lastMonthData[0].lastMonthUsers;

          res.status(200).json({
            users,
            totalUsers,
            lastMonthUsers,
          });
        }
      );
    });
  });
};
