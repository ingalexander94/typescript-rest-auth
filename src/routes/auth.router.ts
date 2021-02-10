import { Router } from "express";
import { login, register } from "../controllers/auth.controller.";
import { loginValidate, registerValidate } from "../validators/auth.validator";

const router: Router = Router();

router.post("/login", loginValidate(), login);
router.post("/register", registerValidate(), register);

export default router;
