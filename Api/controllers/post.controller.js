// import Post from "../models/post.model.js"
// import { errorHandler } from "../utils/error.js"

// // Create new blog post (admin only)
// export const create = async (req, res, next) => {
//     console.log(req.body)

//     // Check if user is admin
//     if (!req.user.isAdmin) {
//         return next(errorHandler(403, 'you are not allowed to create a post'))
//     }

//     // Validate required fields
//     if (!req.body.title || !req.body.content) {
//         return next(errorHandler(400, 'Please provide all required fields'))
//     }

//     // Generate URL-friendly slug from title
//     const slug = req.body.title
//         .split(' ')
//         .join('-')
//         .toLowerCase()
//         .replace(/[^a-zA-Z0-9-]/g, '')

//     const newPost = new Post({
//         ...req.body,
//         slug,
//         userId: req.user.id,
//     })

//     try {
//         const savedPost = await newPost.save()
//         res.status(201).json(savedPost)
//     } catch (error) {
//         next(error)
//     }
// }

// // Get posts with filtering, searching, and pagination
// export const getPosts = async (req, res, next) => {
//     try {
//         console.log('getPosts called with query:', req.query);
        
//         const startIndex = parseInt(req.query.startIndex) || 0;
//         const limit = parseInt(req.query.limit) || 9;
//         const sortDirection = req.query.order === 'asc' ? 1 : -1

//         // Build filter object
//         const filter = {
//             ...(req.query.userId && { userId: req.query.userId }),
//             ...(req.query.category && { category: req.query.category }),
//             ...(req.query.postId && { _id: req.query.postId }),
//             ...(req.query.slug && { slug: req.query.slug }),
//             ...(req.query.searchTerm && {
//                 $or: [
//                     { title: { $regex: req.query.searchTerm, $options: 'i' } },
//                     { content: { $regex: req.query.searchTerm, $options: 'i' } },
//                 ]
//             })
//         };

//         console.log('Filter object:', filter);

//         const posts = await Post.find(filter)
//             .sort({ updatedAt: sortDirection })
//             .skip(startIndex)
//             .limit(limit);

//         console.log('Found posts:', posts.length);

//         const totalPosts = await Post.countDocuments();

//         const now = new Date();
//         const oneMonthAgo = new Date(
//             now.getFullYear(),
//             now.getMonth() - 1,
//             now.getDate()
//         );

//         const lastMonthPosts = await Post.countDocuments({
//             createdAt: { $gte: oneMonthAgo },
//         });

//         const response = {
//             posts,
//             totalPosts,
//             lastMonthPosts,
//         };

//         console.log('Sending response:', response);
//         res.status(200).json(response);

//     } catch (error) {
//         console.error('Error in getPosts:', error);
//         next(error)
//     }
// }


// export const deletePost = async (req, res, next)=>{
//   console.log(req.params)

//     if( !req.user.isAdmin || req.user.id !== req.params.userId){
//         return next(errorHandler(403, 'user not Authorized to delete post'))
//     }
//    try {
//     await Post.findByIdAndDelete(req.params.postId)
//     res.status(200).json('User successfully deleted')
//    } catch (error) {
//     next(error)
//    }


// }


// export const updatePost = async (req, res, next)=>{
//     if(!req.user.isAdmin || req.user.id !== req.params.userId){
//         return next(errorHandler(403, 'user not Authorized to update post'))
//     }
//     try {
//       const updatedPost = await Post.findByIdAndUpdate(req.params.postId,{
//         $set:{
//             title:req.body.title,
//             content:req.body.content,
//             category:req.body.category,
//             image:req.body.image,
           
//         }
//       }, {new: true} )

//      res.status(200).json(updatedPost)
//     } catch(error){
//         console.log(error.message)
//     }
// }

import { db } from "../db.js";
import { errorHandler } from "../utils/error.js";

export const create = (req, res, next)=>{
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'you are not allowed to create a post'))
    }

       if (!req.body.title || !req.body.content) {
            return next(errorHandler(400, 'Please provide all required fields'))
        }


    const {title, content,image,category} = req.body 
    const user_id = req.user.id
    const slug = title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g,'')

   

    const insertQuery = `INSERT INTO posts(title, user_id ,content, image, category, slug)
     VALUES (?,?,?,?,?,?)`

     db.query(insertQuery, [title,user_id, content,image,category,slug], (err,data)=>
    {
        if(err) return next(err)
         
        res.status(200).json({message:"Post created successfylly", id:data.insertId, slug:slug})
       
    })        
}


export const getPosts =(req,res,next)=>{
    console.log('getposts called with query:', req.query);

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? "ASC" : "DESC"

    let whereClauses = [];
    let values = [];

    if(req.query.userId){
        whereClauses.push("user_id=?")
        values.push(req.query.userId);
    }

     if (req.query.category) {
    whereClauses.push("category = ?");
    values.push(req.query.category);
  }

  if (req.query.postId) {
    whereClauses.push("id = ?");
    values.push(req.query.postId);
  }

  if (req.query.slug) {
    whereClauses.push("slug = ?");
    values.push(req.query.slug);
  }
   
  if (req.query.searchTerm) {
    whereClauses.push("(title LIKE ? OR content LIKE ?)");
    values.push(`%${req.query.searchTerm}%`, `%${req.query.searchTerm}%`);
  }

  const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : '';

  const selectQuery = `SELECT * FROM posts ${whereSql}
   ORDER BY updated_at ${sortDirection} LIMIT ?, ? `;

   db.query(selectQuery,[...values, startIndex,limit], (err,posts)=>{
    if(err) return next(err)
    
    const countQuery = `SELECT COUNT(*) as total FROM posts ${whereSql}`;
    db.query(countQuery, values, (err,data)=>{
        if (err) return next(err);

        const totalpost = data[0].total


        const lastMonthQuery = ` SELECT COUNT(*) as lastMonthPosts 
        FROM posts 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)`;
       
        db.query(lastMonthQuery, (err,data)=>{
            if(err) return next(err)

          res.status(200).json({
          posts,
          totalpost,
          // lastMonthPosts: lastMonthResult[0].lastMonthPosts,
            })
           

        })

    })

   } )

}


export const deletePost = (req, res, next)=>
{
  const {postId, userId} = req.params

     if( !req.user.isAdmin || req.user.id !== parseInt(userId)){
        return next(errorHandler(403, 'user not Authorized to delete post'))
    }

    const deleteQuery = 'DELETE From posts WHERE id=?'
    const id = req.body.id
    db.query(deleteQuery,[postId], (err, result) => {
    if (err) return next(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  });
}


export const updatePost = (req, res, next) => {
  const { postId, userId } = req.params;
  const { title, content, category, image } = req.body;

  if (!req.user.isAdmin || req.user.id !== parseInt(userId)) {
    return next(errorHandler(403, "User not authorized to update post"));
  }

  const updateQuery = `
    UPDATE posts 
    SET title = ?, content = ?, category = ?, image = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.query(updateQuery, [title, content, category, image, postId], (err, result) => {
    if (err) return next(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully" });
  });
};