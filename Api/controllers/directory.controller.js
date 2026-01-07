import {db} from "../db.js";
import { errorHandler } from "../utils/error.js";





export const createPrincipal = async (req, res, next) =>{

    const {name,message,image} = req.body

  const query = `INSERT into principal (name, message, image) VALUES (?,?,?)`

  db.query(query, [name, message, image], (err, data)=> {
     if(err) return next(err)

 return res.status(200).json('Principal add Successfully')


  })

}


export const getPrincipal = async (req, res, next) => {
  const query = `SELECT * FROM principal LIMIT 1`

  db.query(query, (err, data) => {
    if (err) return next(err)

    if (data.length === 0) {
      return res.status(404).json({ message: 'No principal data found' })
    }

    return res.status(200).json(data[0])
  })
}


export const updatePrincipal = async (req, res, next) => {
  const { name, message, image } = req.body

  const query = `UPDATE principal SET name = ?, message = ?, image = ? WHERE id = 1`

  db.query(query, [name, message, image], (err, data) => {
    if (err) return next(err)

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: 'Principal not found' })
    }

    return res.status(200).json('Principal updated successfully')
  })
}