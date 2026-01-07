import { db } from "../db.js";

export const createAlumni = (req, res, next) => {
  const { name, role, description, image } = req.body;

  const query = `INSERT INTO alumni (name, role, description, image) VALUES (?,?,?,?)`;

  db.query(query, [name, role, description, image], (err) => {
    if (err) return next(err);
    res.status(200).json("Alumni created successfully");
  });
};

export const getAlumni = (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = parseInt(req.query.startIndex) || 0;

  const countQuery = `SELECT COUNT(*) as total FROM alumni WHERE deleted = 0`;

  db.query(countQuery, (err, countData) => {
    if (err) return next(err);

    const total = countData[0].total;

    const query = `
      SELECT * FROM alumni
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

export const getAlumniById = (req, res, next) => {
  const id = req.params.id;

  db.query(
    `SELECT * FROM alumni WHERE id = ? AND deleted = 0`,
    [id],
    (err, data) => {
      if (err) return next(err);
      res.status(200).json(data[0]);
    }
  );
};

export const updateAlumni = (req, res, next) => {
  const id = req.params.id;
  const { name, role, description, image } = req.body;

  const query = `
    UPDATE alumni
    SET name = ?, role = ?, description = ?, image = ?
    WHERE id = ?
  `;

  db.query(query, [name, role, description, image, id], (err) => {
    if (err) return next(err);
    res.status(200).json("Alumni updated successfully");
  });
};

export const deleteAlumni = (req, res, next) => {
  const id = req.params.id;

  const query = `
    UPDATE alumni
    SET deleted = 1
    WHERE id = ?
  `;

  db.query(query, [id], (err) => {
    if (err) return next(err);
    res.status(200).json("Alumni deleted successfully");
  });
};
