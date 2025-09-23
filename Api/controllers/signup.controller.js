import {db} from '../db.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';



// User registration with email and password
// export const signup = async (req, res, next) => {
    

//     const { username, email, password } = req.body


//     // Validate required fields
//     if (!username ||
//         !email ||
//         !password ||
//         username === '' ||
//         email === '' ||
//         password === '') {
//         return next(errorHandler(400, 'All fields are required'));
//     }

//     // Hash password for secure storage
//     const hashedPassword = bcryptjs.hashSync(password, 10)

//     const newUser = new User({
//         username,
//         email,
//         password: hashedPassword
//     })

//     try {
//         await newUser.save()
//         res.json({ message: 'User created successfully', user: newUser })
//     } catch (error) {
//         next(error)
//     }
// }


export const signup = async (req, res, next)=>{
     const selectQuery = "SELECT * FROM users WHERE email = ? OR username = ?"

      const {username, email, password} = req.body

            if(!username || !email || !password || username === '' || email === '' || 
                password === '') {
                    return next(errorHandler(400, 'All fields are required'))
                }


     db.query(selectQuery,[req.body.email, req.body.username], (err, data)=>{
        if(err){
            return res.json(err)
        }

        if(data.length){
            return res.status(409).json("user already exists")
        }

        
  const hashedPassword = bcryptjs.hashSync(password, 10)
        
   try {
        const insertQuery = 'INSERT INTO users(`username`,`email`,`password`) VALUES (?)'
        const values = [username,email, hashedPassword]

        db.query(insertQuery,[values], (err, data)=>{
            if(err) return res.json(err)

          return res.status(200).json("Signup Successful")
        })



        } catch (error) {
            next(error)
        }
     })
    
}


// User authentication with username and password
// export const signin = async (req, res, next) => {
//     const { username, password } = req.body

//     if (!username || !password) {
//         return next(errorHandler(400, 'Username and password are required'))
//     }
//     try {
//         const validUser = await User.findOne({ username })
//         if (!validUser) {
//             return next(errorHandler(404, 'User not found'))
//         }

//         const validPassword = bcryptjs.compareSync(password, validUser.password)
//         if (!validPassword) {
//             return next(errorHandler(401, 'Invalid password'))
//         }
//         // Generate JWT token
//         const token = jwt.sign(
//             { 
//                 id: validUser._id,
//                 isAdmin: validUser.isAdmin
//             }, 
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         )
//         // Remove password from response
//         const { password: pass, ...rest } = validUser._doc

//         res.status(200)
//             .cookie('access_token', token, {
//                 httpOnly: true,
//             })
//             .json(rest)
//     } catch (error) {
//         return next(error)
//     }
// }

export const signin = (req, res, next)=>{

    const { username, password } = req.body

     if(!username || !password){
        return next(errorHandler(400, "All fields are required"))
     }


      const selectQuery = "Select * FROM users WHERE username = ?";
 
     db.query(selectQuery,[username], (err,data)=>{
            if(err) return next(err)
            
            if(data.length === 0) { 
                return next(errorHandler(404, "User not found"))
            }
         
        
        const validUser = data[0]; //
        
  
  const validPassword = bcryptjs.compareSync(password, validUser.password)
  if(!validPassword){
    return next(errorHandler(401, 'Invalid Password'))
  }

  const token = jwt.sign(
     {
        id: validUser.id,
        isAdmin: validUser.isAdmin || false,
     }, 

     process.env.JWT_SECRET,{ expiresIn: '1h'}
  )
   
  const {password: pass, ...rest } = validUser

  res.status(200).cookie('access_token', token, {  
    httpOnly:true  
  }).json(rest)
        })
  

}




// Google OAuth authentication
// export const google = async (req, res, next) => {
//     const { name, email, googlePhotoUrl } = req.body
    
//     try {
//         const user = await User.findOne({ email })

//         if (user) {
//             // Existing user - sign them in
//             const token = jwt.sign(
//                 { 
//                     id: user._id, 
//                     isAdmin: user.isAdmin 
//                 }, 
//                 process.env.JWT_SECRET
//             );
            
//             const { password, ...rest } = user._doc;
            
//             res.status(200)
//                 .cookie('access_token', token, {
//                     httpOnly: true
//                 })
//                 .json(rest)
//         } else {
//             // New user - create account and sign them in
//             const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
//             const hashedPassword = bcryptjs.hashSync(generatePassword, 10)

//             const newUser = new User({
//                 username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
//                 email,
//                 password: hashedPassword,
//                 profilePhoto: googlePhotoUrl,
//             })

//             await newUser.save()
            
//             const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
//             const { password, ...rest } = newUser._doc

//             res.status(200)
//                 .cookie('access_token', token, {
//                     httpOnly: true,
//                 })
//                 .json(rest)

//             console.log(googlePhotoUrl)
//         }

//     } catch (error) {
//         next(error)
//     }
// }


export const google = (req, res, next) =>{
   
    const {name, email, googlePhotoURL} = req.body
    
    const selectQuery = "SELECT * FROM users WHERE  email = ?"

     db.query(selectQuery, [email], (err, data)=>{
       
        if(err) return res.json(err)
         
       if(data.length > 0){
        
        const validUser = data[0];

        const token = jwt.sign(
            {
                id: validUser.id,
                isAdmin: validUser.isAdmin || false
            },

            process.env.JWT_SECRET,{expiresIn: '1h'}
        )

        const {password: pass, ...rest} = validUser
          
     return  res.status(200).cookies('access_token', token, {
         httpOnly:true
        }).json(rest)

       }
       
       const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)



       
  try    {
        const insertQuery = "INSERT INTO users(`username`, `email`, `password`, `profilePic`) VALUES(?)"
        const values = [name, email, hashedPassword, googlePhotoURL]

        db.query(insertQuery, [values], (err,data)=>{
            if(err) return res.json(err)

                const token = jwt.sign(
                    {
                        id:data.insertId,
                        isAdmin:false
                    },

                    process.env.JWT_SECRET, {expiresIn:"1h"}
                );

          return   res
          .status(200).
          cookie("access_token", token, {httpOnly:true })
            .json({
                    id: result.insertId,
                    username: name,
                    email,
                    profilePic: googlePhotoURL
                }); 
        })
    
    }catch(error){
        next(error)
    }


       
    })

}