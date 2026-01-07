import { db } from "../db.js";

export const createPrefect = (req, res, next) => {
  const { name, role, image } = req.body;

  const query = `INSERT INTO prefects (name, role, image) VALUES (?,?,?)`;

  db.query(query, [name, role, image], (err) => {
    if (err) return next(err);
    res.status(200).json("Prefect created successfully");
  });
};

export const getPrefects = (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = parseInt(req.query.startIndex) || 0;

  const countQuery = `SELECT COUNT(*) as total FROM prefects WHERE deleted = 0`;

  db.query(countQuery, (err, countData) => {
    if (err) return next(err);

    const total = countData[0].total;

    const query = `
      SELECT * FROM prefects
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

export const getPrefectById = (req, res, next) => {
  const id = req.params.id;

  db.query(
    `SELECT * FROM prefects WHERE id = ? AND deleted = 0`,
    [id],
    (err, data) => {
      if (err) return next(err);
      res.status(200).json(data[0]);
    }
  );
};

export const updatePrefect = (req, res, next) => {
  const id = req.params.id;
  const { name, role, image } = req.body;

  const query = `
    UPDATE prefects
    SET name = ?, role = ?, image = ?
    WHERE id = ?
  `;

  db.query(query, [name, role, image, id], (err) => {
    if (err) return next(err);
    res.status(200).json("Prefect updated successfully");
  });
};

export const deletePrefect = (req, res, next) => {
  const id = req.params.id;

  const query = `
    UPDATE prefects
    SET deleted = 1
    WHERE id = ?
  `;

  db.query(query, [id], (err) => {
    if (err) return next(err);
    res.status(200).json("Prefect deleted successfully");
  });
};
