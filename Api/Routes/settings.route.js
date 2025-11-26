import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { getabout, createabout, updateabout } from "../controllers/about.controller.js";
import { gethomepage, createhomepage,updatehomepage } from "../controllers/homepage.controller.js";
import { getprogram, createprogram, updateprogram } from "../controllers/programmes.controller.js";
import { getcta,createcta, updatecta } from "../controllers/cta.controller.js";
import {getblog, createblog, updateblog} from '../controllers/blog.controller.js'
import { createActivity, getActivities, getActivityById, updateActivity } from "../controllers/activity.controller.js";
import { createinter, getinter, updateinter } from "../controllers/inter.controller.js";
import { createAnthem, getAnthem, updatAnthem } from "../controllers/anthem.controller.js";
import { createQuiz, getQuiz, updateQuiz } from "../controllers/quiz.controller.js";
import { createExcur, getExcur, updateExcur } from "../controllers/excur.controller.js";
import { createCult, getCult, updateCult } from "../controllers/cult.controller.js";

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



router.post('/createactivity',verifyToken, createActivity)
router.get('/activities', getActivities)
router.get('/activity/:id', getActivityById)
router.put('/activity/:id',verifyToken, updateActivity)


router.post('/createinter', verifyToken, createinter)
router.get('/interhouse', getinter )
router.put('/updateinter', verifyToken,updateinter)

router.post('/createquiz', verifyToken, createQuiz)
router.get('/quiz', getQuiz )
router.put('/updatequiz', verifyToken,updateQuiz)

router.post('/createanthem', verifyToken, createAnthem)
router.get('/anthem', getAnthem )
router.put('/updateanthem', verifyToken,updatAnthem)


router.post('/createexcur', verifyToken, createExcur)
router.get('/excur', getExcur )
router.put('/updateexcur/:excurid', verifyToken,updateExcur)

router.post('/createcult', verifyToken, createCult)
router.get('/cult', getCult)
router.put('/updatecult/:cultid', verifyToken,updateCult)

export default router;
