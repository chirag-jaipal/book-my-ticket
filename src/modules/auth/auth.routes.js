import { Router } from "express";
import validate from "../../common/dto/validate.middleware.js";
import RegisterSchema from "./dto/register.dto.js";
import * as controller from "./auth.controller.js";
import LoginSchema from "./dto/login.dto.js";

const router = Router();

router.post("/register", validate(RegisterSchema), controller.register);
router.post("/login", validate(LoginSchema), controller.login);

export default router;
