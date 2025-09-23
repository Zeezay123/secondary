import {db} from '../db.js'
import { errorHandler } from '../utils/error.js'

export const getcta =(req,res,next)=>{

    const selectQuery = "SELECT * FROM cta_settings ORDER BY id DESC LIMIT 1"

    db.query(selectQuery, (err,data)=>{
        if(err) return next(err);
      
        res.status(200).json(data[0])

    })

}




export const createcta =(req, res, next)=>{
    if(!req.user){
        return next(errorHandler(403, "You are not allowed to create user"))
    }

const { title, subtitle} = req.body


    const insertQuery = `INSERT INTO cta_settings (title, 
    subtitle, second_title, content) VALUES (?,?,?,?)`
   
     db.query(insertQuery,[title,subtitle, second_title, content], (err,data)=>{
        if(err) return next(err)

        return res.status(200).json({message:"cta_settings created successfully"})
     })

}

export const updatecta =()=>{

    if(!req.user.isAdmin){
        return next(errorHandler(403, "Not allowed"));
    }

    const { title, subtitle } = req.body;
    const updateQuery = `UPDATE cta_settings SET 
    title=?, subtitle=? update_time=CURRENT_TIMESTAMP WHERE id=1`

    db.query(updateQuery,[title,subtitle], (err, data)=>{
  
        if(err) return next(err)
        
        res.status(200).json({ message: "cta_settings updated successfully" });
    })


}