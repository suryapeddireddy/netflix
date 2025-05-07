import { Router } from "express";
import { signin, signup, logout, getuser } from "../controllers/user.controllers.js";
import VerifyJWT from "../middlewares/Auth.middlewares.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/getuser").get(VerifyJWT, getuser); // ✅ Add VerifyJWT to protect route
router.route("/logout").post(VerifyJWT, logout);

export default router;
