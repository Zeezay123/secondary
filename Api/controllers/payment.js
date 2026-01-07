import { db } from "../db.js";
import { errorHandler } from "../utils/error.js";


export const create =(req, res, next)=>{

const {reference, email, name, amount, paid, childNum } = req.body

try {
    const query = `INSERT INTO formpayment (email, name, reference, amount, status, children ) VALUES (?,?,?,?,?,?)`
    db.query(query,[email,name,reference,amount,paid, childNum],(err,data)=>{
        if(err) return next(err)
        res.status(201).json({message:" Successfully added",status:'paid',email,reference,name,amount,paid })  
        console.log({info:data.insertId})
    })

} catch (error) {
  return next(errorHandler(402,"Can't Insert"))
}

}


export const get=(req, res, next)=>{
    const order = 'DESC'
    const limit =  parseInt(req.query.limit) || 10 
    const startIndex = parseInt(req.query.startIndex) || 1
    const countQuery = `SELECT COUNT(*) as total FROM formpayment`
    // const query= `SELECT * FROM formpayment ORDER BY ? LIMIT ? OFFSET ?`

 db.query(countQuery,(err,data)=>{
    if(err) return next(err)
     
    const query =`SELECT * FROM formpayment ORDER BY ? LIMIT ? OFFSET ? `
    const total = data[0].total
    db.query(query,[order, limit, startIndex], (err, data)=>{
        if(err) return next(err)

            res.status(200).json({
                data,
                total
            })
    })
 })

} 

export const getRef = (req, res, next) => {
    const { reference } = req.params
    const query = `SELECT * FROM formpayment WHERE reference = ?`  

    db.query(query, [reference], (err, data) => {
        if (err) return next(err);
        return res.status(200).json(data[0]);
    }); 
}