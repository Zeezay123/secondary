import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './Routes/user.route.js';
import authRoutes from './Routes/auth.route.js';
import postRoutes from './Routes/post.route.js';
import facultyRoutes from './Routes/faculty.route.js'
import departRoutes from './Routes/depart.route.js';
import courseRoutes from './Routes/course.route.js'
import settingRoutes from './Routes/settings.route.js'
import staffRoutes from './Routes/staff.route.js'
import cookieParser from 'cookie-parser';
import contentRoutes from './Routes/content.js'
import multer from 'multer';

dotenv.config();


const app = express();
app.use(express.json()); 

app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './postgrad-page/uploads')
    },
     filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage })

app.post('/api/uploads', upload.single('file'), function (req, res) {
const file = req.file
res.status(200).json(file.filename)
})
app.use('/api/users', userRoutes);


app.use('/api/auth', authRoutes);


app.use('/api/faculty', facultyRoutes )
app.use('/api/departments', departRoutes)
app.use('/api/course', courseRoutes)
app.use('/api/settings', settingRoutes)
app.use('/api/staff', staffRoutes)
app.use('/api/content',contentRoutes )
app.use('/api/post',postRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Use custom status code or default to 500
    const message = err.message || 'Internal Server Error'; // Use custom message or default
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

// Function to connect to MongoDB database
const connectToDb = async () => {
    try {   
   
        
        console.log('Connected to Database');
    
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
        
    } catch(error) {
    
        console.error('Error connecting to Database:', error);
        process.exit(1); 
    }
}


connectToDb()
