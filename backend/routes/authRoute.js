import { Signup ,Login,Logout, onboard} from '../controllers/authControllers.js';
import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';

const router =express.Router();

router.post("/signup",Signup)

router.post("/login",Login)

router.post("/logout",Logout)

router.post("/onboard",protectRoute,onboard)

router.get('/me',protectRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user})
})
export default router;