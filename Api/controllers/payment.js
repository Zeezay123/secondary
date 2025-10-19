import { db } from "../db";
import { errorHandler } from "../utils/error";


export const create =(req, res, next)=>{

const {reference, email, name, amount } = req.body

try {
    const query = `INSERT INTO Payments (email,name,reference,amount) WHERE values(?,?,?,?)`
    db.query(query,[email,name,reference,amount],(err,data)=>{
        if(err) return next(err)
        res.status(201).json({
          id:result.insertId,
          name,
          email,
          reference,
          amount,
          status:'paid'
    })  

    })

} catch (error) {
    
}

}