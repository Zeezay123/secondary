import { errorHandler } from "../utils/error.js";
import {db} from '../db.js'



export const create = async(req,res,next)=>{
 
const {title, content, image} =req.body

const query = `INSERT INTO announce (title, content, image) VALUES (?,?,?)`

db.query(query,[title,content,image], (err,data)=>{
  if(err) return next(err)

   return res.status(200).json('Annoucement Created')
})

}


export const getAnnounce= async (req,res,next)=>{
    const limit =  parseInt(req.query.limit) || 10 
    const startIndex = parseInt(req.query.startIndex) || 0

    
    const countQuery = `SELECT COUNT(*) as total FROM announce WHERE deleted = 0`


  db.query(countQuery,(err,data)=>{
    if(err) return next(err)
      const total = data[0].total
      const query = `SELECT * FROM announce WHERE deleted = 0 ORDER BY id DESC LIMIT ? OFFSET ?`
      
    
      db.query(query,[limit, startIndex],(err,data)=>{
        if(err) return next(err)
    
          return res.status(200).json({data,total})
      })
  })
    
}

export const getAnnounceById= async (req,res,next)=>{
const annId = req.params.id
  const query = `SELECT * FROM announce WHERE id =? AND deleted = 0`

  db.query(query,[annId], (err,data)=>{
    if(err) return next(err)

      return res.status(200).json(data[0])
  })
    
}

export const updateAnnounce = async (req, res, next) => {
  const annId = req.params.id
 const {title, content, image} =req.body
  const query =`UPDATE announce SET title=?, content = ?, image=? WHERE id=?`

db.query(query,[title,content,image, annId], (err,data)=>{
  if(err) return next(err)

   return res.status(200).json('Annoucement Updated')
})

  }

export const deleteAnnounce = async (req,res,next)=>{
      
      const annId = req.params.id;
      
      const queryOne = 'SELECT * FROM announce WHERE id=?'
      
      db.query(queryOne, [annId],(err,data)=>{
        if(err) return next(err)

          if(!data.length)
           {
            return res.status(400).json("Announcement not found")
           }
         const newData = data[0]
          const newTitle = `${newData.title} Deleted`

  const query = `UPDATE announce SET title=?, deleted = 1 WHERE id = ?`;

      db.query(query, [newTitle, annId], (err, data)=>{  
        if(err) return next(err)

        return  res.status(200).json('Yearbook deleted successfully')
      })
        })
      
     

    }
