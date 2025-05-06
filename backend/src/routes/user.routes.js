import { Router } from "express";
import {signin,signup,logout,getuser} from '../controllers/user.controllers.js'
import VerifyJWT from '../middlewares/Auth.middlewares.js'
const router=Router();
router.route('/signin').post(signup);
router.route('/signup').post(signup);
router.route('/getuser').get(getuser);
router.route('/logout').post(VerifyJWT,logout);

export default router;