import { db } from "../db";


export const createForm =(req,res,next)=>{

    const query =  `INSERT INTO application_form 
    (firstname, lastname, othername, email, phonenumber, gender, classroom, states, lga, relation, reference, amount ) values`
}
