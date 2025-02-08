
import { Router } from "express";
import { login, signup } from "./auth.controller.js";
import { checkEmail } from "../../Middlewares/checkEmail.js";

const authRouter = Router();

authRouter
.route("/signup")
.post(checkEmail, signup)

authRouter
.route("/login")
.post(login)



export default authRouter;
