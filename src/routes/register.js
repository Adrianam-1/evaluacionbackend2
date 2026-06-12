import express from "express";

import registerController from "../controllers/registerController.js";

const router = express.Router()

router.route("/")
.post (registerController.register);
router.route("/verifyCodeEmail ").post (registerController.verifyCode);

export default router;