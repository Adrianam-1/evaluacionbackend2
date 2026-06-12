import bcrypt from "bcryptjs";
import jsonwebToken from "jsonwebtoken";

import { config } from "../config.js"

const loginPacientesController = {};

loginPacientesController.login = async( req,res) => {
    try {
        const {email, password} = req.body
    } catch (error) {
        
    }
}