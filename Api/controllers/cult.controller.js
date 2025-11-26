
import { errorHandler } from '../utils/error.js'

import { db } from "../db.js";


export const createCult =(req,res,next)=>{
  
    const {title,subtitle,
         intro,imageOne,
        } = req.body

const query = `INSERT INTO cult (title, subtitle, intro, imageone)
 VALUES (?,?,?,?)`;

 db.query(query,[title,subtitle,
         intro,imageOne], (err,data)=>{

            if(err) return next(err)


                return res.status(200).json('Successfully Created ')
        })


}
 
export const updateCult=(req,res,next)=>{
  
    const {cultid} = req.params;
   const {title,subtitle,
         intro,imageOne} = req.body

    const query = `UPDATE cult SET title = ?, subtitle = ?, intro = ?,
     imageone = ? WHERE id = ? `


     db.query(query,[title,subtitle,
         intro,imageOne,cultid], (err,data)=>{
            if(err) return next(err)

                return res.status(200).json("Updated Successfully")
        })
}

export const getCult=(req,res,next)=>{

    const query = `SELECT * FROM cult`

    db.query(query,(err,data)=>{
        if(err) return next(err)
            return res.status(200).json(data)
    })
  
}