
import { db } from "../db.js";
import { errorHandler } from "../utils/error.js";



export const createActivity = (req, res, next) => {

const {act, descp} = req.body;

const query = "INSERT INTO activity (activity, description) VALUES (?,?)";

db.query(query, [act, descp], (err, data)=>{

    if(err) return next(err)

return res.status(200).json({message: "Activity created Successfully"})
})

}


export const getActivities =(req,res,next)=>{
    const query = "SELECT * FROM activity ORDER BY id ASC"

    db.query(query,(err,data)=>{
        if(err) return next (err)
    
            return res.status(200).json(data)
        })

}

export const getActivityById = (req,res,next)=>{

     const {ac} = req.params;

     const query = 'SELECT * FROM activity WHERE id = ?'

     db.query(query, [ac], (err,data)=>{
        if(err) return next(err) 

            res.status(200).json(data[0])
     })
}

export const updateActivity = (req,res,next)=>{
    const {ac, descp} = req.params;

    const query = "UPDATE activity SET activity = ?, description = ? WHERE activity = ?"

    db.query(query,[ac,descp], (err,data)=>{
        if(err) return next(err)

        return res.status(200).json({message: "Activity updated Successfully"})
    })
}