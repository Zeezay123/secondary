import {db} from '../db.js'
import { errorHandler } from '../utils/error.js'


export const getabout =(req, res, next) =>{
   
    const selectQuery = "SELECT * FROM about ORDER BY id DESC LIMIT 1 " 

     db.query(selectQuery, (err,data)=>{
       if(err) return next(err)
      if(data.length === 0) return res.status(404).json("No about section found")
     
        res.status(200).json(data[0])
    })

}

export const createabout =(req,res,next)=>{
    if(!req.user){
        return next(errorHandler(403, "you are not allowed to create about"))
    }
     const { title,
        subtitle, intro, mission, vision, 
        philosophy, vcMessage,
        directorMessage, vcimage, directorimage} = req.body


    const insertQuery = `INSERT INTO about (title, 
    subtitle, intro, mission, vision, philosophy, vcMessage,
     directorMessage, vcimage, directorimage) VALUES (?,?,?,?,?,?,?,?,?,?)`
   
     db.query(insertQuery,[title,subtitle, intro, 
        mission, vision, philosophy, vcMessage,
     directorMessage, vcimage, directorimage], (err,data)=>{
        if(err) return next(err)

        return res.status(200).json({message:"About created successfully"})
     })

}

export const updateabout =(req,res,next)=>{
    
    if(!req.user.isAdmin){
        return next(errorHandler(403, "Not allowed to update about"))
    }

    const {
    title, subtitle, intro, mission, vision,
    philosophy, vcMessage, directorMessage, vcimage, directorimage
  } = req.body;

  const updateQuery = `UPDATE about 
  SET title = ?, subtitle = ?, intro = ?, mission = ?, vision = ?,
      philosophy = ?, vcMessage = ?, directorMessage = ?, vcimage = ?, directorimage = ?,
      update_time = CURRENT_TIMESTAMP
    WHERE id = 1 `

    db.query(updateQuery,[title, subtitle, intro, mission, vision,
    philosophy, vcMessage, directorMessage, vcimage, directorimage
  ], (err, result) => {
    if (err) return next(err);
    res.status(200).json({ message: "About section updated successfully" });
  })
}