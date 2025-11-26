
import { errorHandler } from '../utils/error.js'

import { db } from "../db.js";


export const createinter =(req,res,next)=>{
  
    const {title,subtitle,
         intro,imageOne,
         imageTwo,imageThree,imageFour,imageFive,
        imageSix} = req.body

const query = `INSERT INTO interhouse (title, subtitle, intro, imageone, 
imagetwo, imagethere, imagefour,
 imagefive, imagesix) VALUES (?,?,?,?,?,?,?,?,?)`;

 db.query(query,[title,subtitle,
         intro,imageOne,
         imageTwo,imageThree,imageFour,imageFive,
        imageSix], (err,data)=>{

            if(err) return next(err)


                return res.status(200).json('Successfully Created ')
        })


}
 
export const updateinter=(req,res,next)=>{

   const {title,subtitle,
         intro,imageOne,
         imageTwo,imageThree,imageFour,imageFive,
        imageSix} = req.body

    const query = `UPDATE interhouse SET title = ?, subtitle = ?, intro = ?,
     imageone = ?, imagetwo = ?, imagethere = ? , imagefour = ?,
     imagefive = ?, imagesix = ? `


     db.query(query,[title,subtitle,
         intro,imageOne,
         imageTwo,imageThree,imageFour,imageFive,
        imageSix], (err,data)=>{
            if(err) return next(err)

                return res.status(200).json("Updated Successfully")
        })
}

export const getinter=(req,res,next)=>{

    const query = `SELECT * FROM interhouse`

    db.query(query,(err,data)=>{
        if(err) return next(err)
            return res.status(200).json(data)
    })
  
}