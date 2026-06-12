import express from "express";
import loginPacientesController from "../controllers/loginController.js"

const router = express.Router()
router.route ("/").post(loginPacientesController.login);

export default router