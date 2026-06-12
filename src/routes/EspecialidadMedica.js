import express from "express";
import especialidadesController from "../controllers/especialidadMedicaController.js";

const router = express.Router()
router.route("/")
.get(especialidadesController.getEspecialidades)

router.route("/:id")
.put(especialidadesController.updateEspecialidad)
.delete(especialidadesController.deleteEspecialidades)

export default router
