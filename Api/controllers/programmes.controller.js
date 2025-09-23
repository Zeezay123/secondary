import {db} from '../db.js'
import { errorHandler } from '../utils/error.js'

export const getprogram =(req,res,next)=>{

    const selectQuery = "SELECT * FROM programmes ORDER BY id DESC LIMIT 1"

    db.query(selectQuery, (err,data)=>{
        if(err) return next(err);
      
        res.status(200).json(data[0])

    })

}

export const createprogram =(req, res, next)=>{
    if(!req.user){
        return next(errorHandler(403, "You are not allowed to create user"))
    }

const { title,
        subtitle, second_title, content} = req.body


    const insertQuery = `INSERT INTO programmes (title, 
    subtitle, second_title, content) VALUES (?,?,?,?)`
   
     db.query(insertQuery,[title,subtitle, second_title, content], (err,data)=>{
        if(err) return next(err)

        return res.status(200).json({message:"programmes created successfully"})
     })

}

export const updateprogram =(req,res,next)=>{

    if(!req.user.isAdmin){
        return next(errorHandler(403, "Not allowed"));
    }

    const { title, subtitle, second_title, content } = req.body;
    const updateQuery = `UPDATE programmes SET 
    title=?, subtitle=?, second_title=?, content=?, update_time=CURRENT_TIMESTAMP WHERE id=1`

    db.query(updateQuery,[title,subtitle,second_title, content], (err, data)=>{
  
        if(err) return next(err.message)
        
        res.status(200).json({ message: "programmes updated successfully" });
    })


}