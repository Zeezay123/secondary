import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { getabout, createabout, updateabout } from "../controllers/about.controller.js";
import { gethomepage, createhomepage,updatehomepage } from "../controllers/homepage.controller.js";
import { getprogram, createprogram, updateprogram } from "../controllers/programmes.controller.js";
import { getcta,createcta, updatecta } from "../controllers/cta.controller.js";
import {getblog, createblog, updateblog} from '../controllers/blog.controller.js'


const router = express.Router();
//about
// Public
router.get("/about", getabout);

// Admin only
router.post("/createabout", verifyToken, createabout);
router.put("/updateabout", verifyToken, updateabout);


//homepage
// Public
router.get("/homepage", gethomepage);

// Admin only
router.post("/createhomepage", verifyToken, createhomepage);
router.put("/updatehomepage", verifyToken, updatehomepage);



// Public
router.get("/program", getprogram);

// Admin only
router.post("/createprogram", verifyToken, createprogram);
router.put("/updateprogram", verifyToken, updateprogram);


// Public
router.get("/blog", getblog);

// Admin only
router.post("/createblog", verifyToken, createblog);
router.put("/updateblog", verifyToken, updateblog);

// Public
router.get("/cta", getcta);

// Admin only
router.post("/createcta", verifyToken, createcta);
router.put("/updatecta", verifyToken, updatecta);


export default router;
