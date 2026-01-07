import { errorHandler } from '../utils/error.js'
import { db } from "../db.js";

export const createContact = (req, res, next) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return next(errorHandler(400, "All fields are required"))
  }

  const query = `INSERT INTO contacts (name, email, message, status) VALUES (?, ?, ?, 'unread')`

  db.query(query, [name, email, message], (err, data) => {
    if (err) return next(err)
    return res.status(200).json('Message sent successfully')
  })
}

export const getContacts = (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10
  const startIndex = parseInt(req.query.startIndex) || 0
  const status = req.query.status || null

  let countQuery = `SELECT COUNT(*) as total FROM contacts WHERE deleted = 0`
  let query = `SELECT * FROM contacts WHERE deleted = 0`

  const params = []
  
  if (status) {
    countQuery += ` AND status = ?`
    query += ` AND status = ?`
    params.push(status)
  }

  db.query(countQuery, params, (err, data) => {
    if (err) return next(err)
    const total = data[0].total

    query += ` ORDER BY id DESC LIMIT ? OFFSET ?`
    params.push(limit, startIndex)

    db.query(query, params, (err, data) => {
      if (err) return next(err)
      return res.status(200).json({ data, total })
    })
  })
}

export const getContactById = (req, res, next) => {
  const contactId = req.params.id
  const query = `SELECT * FROM contacts WHERE id = ? AND deleted = 0`

  db.query(query, [contactId], (err, data) => {
    if (err) return next(err)
    if (!data.length) {
      return next(errorHandler(404, "Contact message not found"))
    }
    return res.status(200).json(data[0])
  })
}

export const updateContactStatus = (req, res, next) => {
  const contactId = req.params.id
  const { status } = req.body

  if (!['unread', 'read', 'replied'].includes(status)) {
    return next(errorHandler(400, "Invalid status"))
  }

  const query = `UPDATE contacts SET status = ? WHERE id = ?`

  db.query(query, [status, contactId], (err, data) => {
    if (err) return next(err)
    return res.status(200).json('Contact status updated successfully')
  })
}

export const deleteContact = (req, res, next) => {
  const contactId = req.params.id

  const queryOne = 'SELECT * FROM contacts WHERE id = ?'

  db.query(queryOne, [contactId], (err, data) => {
    if (err) return next(err)

    if (!data.length) {
      return res.status(400).json("Contact message not found")
    }

    const queryTwo = `UPDATE contacts SET deleted = 1 WHERE id = ?`

    db.query(queryTwo, [contactId], (err, data) => {
      if (err) return next(err)
      return res.status(200).json('Contact message deleted successfully')
    })
  })
}
