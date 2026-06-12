import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import pacientesRoutes from "./src/routes/pacientes.js";
import loginRoutes from "./src/routes/pacientes.js";
import registerPacienteRoute from "./src/routes/register.js"
import especialidadMedicaRoute from "./src/routes/EspecialidadMedica.js"
import recoveryPasswordRoute from "./src/routes/recoveryPassword.js";

const app = express();

app.use(
    cors({
        origin:["http://localhost:5173","http://localhost:5174"],
        credentials: true
    })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/pacientes",pacientesRoutes);
app.use("/api/loginPacientes",loginRoutes);
app.use("/api/registerPacientes", registerPacienteRoute);
app.use("/api/especialidadMedica",especialidadMedicaRoute);
app.use("/api/recoveryPassword",recoveryPasswordRoute )
export default app; 