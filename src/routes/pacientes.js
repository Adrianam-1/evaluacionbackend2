import express from "express";
import pacientesController from "../controllers/pacientesController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router()

router.route("/")
.get(pacientesController.getAllDrivers)
.post(upload.single("profilePhoto"),pacientesController.insertPacientes)

router.route("/:id")
.put(upload.single("profilePhoto"),pacientesController.updatePacientes)
.delete(pacientesController.deletePaciente)

export default router