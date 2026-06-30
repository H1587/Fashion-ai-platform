import { Router, type Router as ExpressRouter } from "express";

import { authenticate } from "../../../middleware/auth.middleware.js";
import { login, register } from "../controller/auth.controller.js";
import { me } from "../controller/me.controller.js";

const router: ExpressRouter = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, me);

export default router;