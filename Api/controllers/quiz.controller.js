
import { errorHandler } from '../utils/error.js'

import { db } from "../db.js";


export const createQuiz =(req,res,next)=>{
  
    const {title,subtitle,
         intro,imageOne,
         imageTwo,imageThree,imageFour,imageFive,
        imageSix} = req.body

const query = `INSERT INTO quiz (title, subtitle, intro, imageone, 
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
 
export const updateQuiz=(req,res,next)=>{

   const {title,subtitle,
         intro,imageOne,
         imageTwo,imageThree,imageFour,imageFive,
        imageSix} = req.body

    const query = `UPDATE quiz SET title = ?, subtitle = ?, intro = ?,
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

export const getQuiz=(req,res,next)=>{

    const query = `SELECT * FROM quiz`

    db.query(query,(err,data)=>{
        if(err) return next(err)
            return res.status(200).json(data[0])
    })
  
}