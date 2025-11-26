
import { errorHandler } from '../utils/error.js'

import { db } from "../db.js";


export const createAnthem =(req,res,next)=>{
  
    const {school,anthem, pledge} = req.body

const query = `INSERT INTO anthem (anthem,national,pledge) VALUES (?,?,?)`;

 db.query(query,[school,anthem, pledge], (err,data)=>{

            if(err) return next(err)


                return res.status(200).json('Successfully Created ')
        })


}
 
export const updatAnthem=(req,res,next)=>{

   const {school,anthem, pledge} = req.body

    const query = `UPDATE anthem SET anthem = ?, national = ?, pledge = ?,
    `


     db.query(query,[school,anthem, pledge], (err,data)=>{
            if(err) return next(err)

                return res.status(200).json("Updated Successfully")
        })
}

export const getAnthem=(req,res,next)=>{

    const query = `SELECT * FROM anthem`

    db.query(query,(err,data)=>{
        if(err) return next(err)
            return res.status(200).json()
    })
  
}