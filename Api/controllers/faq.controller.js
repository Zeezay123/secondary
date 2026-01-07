import { errorHandler } from '../utils/error.js'
import { db } from "../db.js";

export const createFaq = (req, res, next) => {
  const { question, answer } = req.body

  if (!question || !answer) {
    return next(errorHandler(400, "Question and answer are required"))
  }

  const query = `INSERT INTO faq (question, answer) VALUES (?, ?)`

  db.query(query, [question, answer], (err, data) => {
    if (err) return next(err)
    return res.status(200).json('FAQ created successfully')
  })
}

export const getFaq = (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10
  const startIndex = parseInt(req.query.startIndex) || 0

  const countQuery = `SELECT COUNT(*) as total FROM faq WHERE deleted = 0`

  db.query(countQuery, (err, data) => {
    if (err) return next(err)
    const total = data[0].total

    const query = `SELECT * FROM faq WHERE deleted = 0 ORDER BY id DESC LIMIT ? OFFSET ?`

    db.query(query, [limit, startIndex], (err, data) => {
      if (err) return next(err)
      return res.status(200).json({ data, total })
    })
  })
}

export const getFaqById = (req, res, next) => {
  const faqId = req.params.id
  const query = `SELECT * FROM faq WHERE id = ? AND deleted = 0`

  db.query(query, [faqId], (err, data) => {
    if (err) return next(err)
    if (!data.length) {
      return next(errorHandler(404, "FAQ not found"))
    }
    return res.status(200).json(data[0])
  })
}

export const updateFaq = (req, res, next) => {
  const faqId = req.params.id
  const { question, answer } = req.body

  if (!question || !answer) {
    return next(errorHandler(400, "Question and answer are required"))
  }

  const query = `UPDATE faq SET question = ?, answer = ? WHERE id = ?`

  db.query(query, [question, answer, faqId], (err, data) => {
    if (err) return next(err)
    return res.status(200).json('FAQ updated successfully')
  })
}

export const deleteFaq = (req, res, next) => {
  const faqId = req.params.id

  const queryOne = 'SELECT * FROM faq WHERE id = ?'

  db.query(queryOne, [faqId], (err, data) => {
    if (err) return next(err)

    if (!data.length) {
      return res.status(400).json("FAQ not found")
    }

    const queryTwo = `UPDATE faq SET deleted = 1 WHERE id = ?`

    db.query(queryTwo, [faqId], (err, data) => {
      if (err) return next(err)
      return res.status(200).json('FAQ deleted successfully')
    })
  })
}
