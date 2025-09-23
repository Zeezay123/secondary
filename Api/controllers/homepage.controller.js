import {db} from '../db.js'
import { errorHandler } from '../utils/error.js'


export const gethomepage =(req,res,next)=>{

    const selectQuery = "SELECT * FROM homepage ORDER BY id DESC LIMIT 1"

    db.query(selectQuery, (err,data)=>{
        if(err) return next(err.message);
      
        res.status(200).json(data[0])

    })

}

export const createhomepage =(req, res, next)=>{
    if(!req.user){
        return next(errorHandler(403, "You are not allowed to create user"))
    }

    try{

const { title,
        subtitle, intro} = req.body


    const insertQuery = `INSERT INTO homepage (title, 
    subtitle, intro) VALUES (?,?,?)`
   
     db.query(insertQuery,[title,subtitle, intro], (err,data)=>{
        if(err) return next(err.message)

        return res.status(200).json({message:"Homepage created successfully"})
     })
    }catch(error){
     next(error)
    }

}

export const updatehomepage =(req,res,next)=>{

    if(!req.user.isAdmin){
        return next(errorHandler(403, "Not allowed"));
    }

    try{
    const { title, subtitle, intro } = req.body;
    const updateQuery = `UPDATE homepage SET 
    title=?, subtitle=?, intro=?, update_time=CURRENT_TIMESTAMP WHERE id=1`

    db.query(updateQuery,[title,subtitle,intro], (err, data)=>{
  
        if(err) return next(err.message)
        
        res.status(200).json({ message: "Homepage updated successfully" });
    })
    } catch(error){
      next(error)
    }

}