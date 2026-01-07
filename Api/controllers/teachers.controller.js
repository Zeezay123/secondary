import { db } from "../db.js";

export const createTeacher = (req, res, next) => {
  const { name, role, image } = req.body;

  const query = `INSERT INTO teachers (name, role, image) VALUES (?,?,?)`;

  db.query(query, [name, role, image], (err) => {
    if (err) return next(err);
    res.status(200).json("Teacher created");
  });
};

export const getTeachers = (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = parseInt(req.query.startIndex) || 0;

  const countQuery = `SELECT COUNT(*) as total FROM teachers WHERE deleted = 0`;

  db.query(countQuery, (err, countData) => {
    if (err) return next(err);

    const total = countData[0].total;

    const query = `
      SELECT * FROM teachers
      WHERE deleted = 0
      ORDER BY id DESC
      LIMIT ? OFFSET ?
    `;

    db.query(query, [limit, startIndex], (err, data) => {
      if (err) return next(err);
      res.status(200).json({ data, total });
    });
  });
};

export const getTeacherById = (req, res, next) => {
  const id = req.params.id;

  db.query(
    `SELECT * FROM teachers WHERE id = ? AND deleted = 0`,
    [id],
    (err, data) => {
      if (err) return next(err);
      res.status(200).json(data[0]);
    }
  );
};

export const updateTeacher = (req, res, next) => {
  const id = req.params.id;
  const { name, role, image } = req.body;

  const query = `
    UPDATE teachers
    SET name = ?, role = ?, image = ?
    WHERE id = ?
  `;

  db.query(query, [name, role, image, id], (err) => {
    if (err) return next(err);
    res.status(200).json("Teacher updated");
  });
};

export const deleteTeacher = (req, res, next) => {
  const id = req.params.id;

  const query = `
    UPDATE teachers
    SET deleted = 1
    WHERE id = ?
  `;

  db.query(query, [id], (err) => {
    if (err) return next(err);
    res.status(200).json("Teacher deleted");
  });
};
