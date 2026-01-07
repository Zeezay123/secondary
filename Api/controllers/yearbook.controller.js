import { db } from "../db.js";
import { errorHandler } from "../utils/error.js";



export const createYearbook = async (req,res,next)=>{

    const {title, description, image, file} = req.body

  const query = `INSERT INTO yearbook (title, content, image, pdf) VALUES (?,?,?,?)`

  db.query(query, [title,description,image, file], (err, data)=>{

    if(err) return next(err)

        return res.status(200).json('Created Successfully')
  })

}


export const getyearbooks = async (req,res,next)=>{

    const query = `SELECT * FROM yearbook WHERE deleted= 0`
  
    db.query(query, (err, data)=>{
  
      if(err) return next(err)
        
        return res.status(200).json(data)
      }
    
       
    )}

    export const getyearbookById = async (req,res,next)=>{
      const yearbookId = req.params.id;
  
      const query = `SELECT * FROM yearbook WHERE id = ? AND deleted= 0`;
      db.query(query, [yearbookId], (err, data) => {
        if (err) return next(err);
            
        return res.status(200).json(data[0]);

      })
    }


    export const deleteYearbook = async (req,res,next)=>{
      
      const yearbookId = req.params.id;
      
      const queryOne = 'SELECT * FROM yearbook WHERE id=?'
      
      db.query(queryOne, [yearbookId],(err,data)=>{
        if(err) return next(err)

          if(!data.length)
           {
            return res.status(400).json("Yearbook not found")
           }
         const newData = data[0]
          const newTitle = `${newData.title} Deleted`

  const query = `UPDATE yearbook SET title=?, deleted = 1 WHERE id = ?`;

      db.query(query, [newTitle, yearbookId], (err, data)=>{  
        if(err) return next(err)

        return  res.status(200).json('Yearbook deleted successfully')
      })
        })
      
     

    }


    export const updateYearbook = async (req,res,next)=>{

      const yearbookId = req.params.id; 
      const {title, content, image, file} = req.body  
     
      const query = `UPDATE yearbook SET title = ?, content = ?, image = ?, pdf = ? WHERE id = ?`;

      db.query(query, [title, content, image, file, yearbookId], (err, data)=>{  
        if(err) return next(err) 
        
        return  res.status(200).json('Yearbook updated successfully')
        })
    
    }