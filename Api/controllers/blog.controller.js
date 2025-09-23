import {db} from '../db.js'
import { errorHandler } from '../utils/error.js'

export const getblog =(req,res,next)=>{

    const selectQuery = "SELECT * FROM blog_settings ORDER BY id DESC LIMIT 1"

    db.query(selectQuery, (err,data)=>{
        if(err) return next(err);
      
        return res.status(200).json(data[0])

    })

}

export const createblog =(req, res, next)=>{
    if(!req.user){
        return next(errorHandler(403, "You are not allowed to create user"))
    }

const { title, subtitle} = req.body


    const insertQuery = `INSERT INTO blog_settings (title, 
    subtitle) VALUES (?,?)`
   
     db.query(insertQuery,[title,subtitle], (err,data)=>{
        if(err) return next(err)

        return res.status(200).json({message:"blog_settings created successfully"})
     })

}

export const updateblog =(req, res, next)=>{

    if(!req.user.isAdmin){
        return next(errorHandler(403, "Not allowed"));
    }
try{
    const { title, subtitle } = req.body;
    const updateQuery = `UPDATE blog_settings SET 
    title=?, subtitle=?, updated_at=CURRENT_TIMESTAMP WHERE id=1`

    db.query(updateQuery,[title,subtitle], (err, data)=>{
  
        if(err) return next(err)
        
      return  res.status(200).json({ message: "blog_settings updated successfully" });
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