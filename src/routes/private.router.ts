import { Router } from "express";
import passport from "passport";
import { privateRoute } from "../controllers/private.controller";

const router: Router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), privateRoute);

export default router;
