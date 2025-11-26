
import { errorHandler } from '../utils/error.js'

import { db } from "../db.js";


export const createExcur =(req,res,next)=>{
  
    const {title,subtitle,
         intro,imageOne,
        } = req.body

const query = `INSERT INTO excur (title, subtitle, intro, imageone)
 VALUES (?,?,?,?)`;

 db.query(query,[title,subtitle,
         intro,imageOne], (err,data)=>{

            if(err) return next(err)


                return res.status(200).json('Successfully Created ')
        })


}
 
export const updateExcur=(req,res,next)=>{
  
    const {excurid} = req.params;
   const {title,subtitle,
         intro,imageOne} = req.body

    const query = `UPDATE excur SET title = ?, subtitle = ?, intro = ?,
     imageone = ? WHERE id = ? `


     db.query(query,[title,subtitle,
         intro,imageOne,excurid], (err,data)=>{
            if(err) return next(err)

                return res.status(200).json("Updated Successfully")
        })
}

export const getExcur=(req,res,next)=>{

    const query = `SELECT * FROM excur`

    db.query(query,(err,data)=>{
        if(err) return next(err)
            return res.status(200).json(data)
    })
  
}