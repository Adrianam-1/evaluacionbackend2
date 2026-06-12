import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import bcrypto from "crypto";
import nodemailer from "nodemailer";

import { config } from "../config.js";

import pacienteModel from "../models/pacientes.js"

const recoveryPasswordController = {};
 recoveryPasswordController.requestCode = async ( req, res) =>{
    try{
            const {email} = req.body;
            const userFound = await pacienteModel.findOne({ email });

            if(!userFound){
                return res.status(404).json({message:"User not found"});
                const token = jsonwebtoken.sign(
                    {email , ramdonCode, userType: userType,verified: false},
                    config.JWT.secret,
                    {expiresIn: "30d"},
                );
                res.cookie("recoveryCookie", token,{maxAge:15*60*1000});
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth:{
                        user: config.email_user_email,
                        pass: config.email_user_password,
                    },
                });
                const mailOptions = {
                    from: config.email.user_email,
                    to: email,
                    subject: "Codigo de recuperacion de contraseña ",
                    body: "El codigo vence en 15 minutos",
                };
                transporter.sendMail(mailOptions,(error.info) > {
                    if (error){
                            return res.status(500).json({message: "Error al enviar correo"})
                    }
                });
            } return res.status(200).json({message: "Email sent"});

    }catch(error){
        console.log("error"+error);
        return res.status(500).json({message: "Internal server error"})
    };

    
 }

 recoveryPasswordController.verifiedCode= async (req, res) =>{
        try {
            const {code } = req.body;
            const token = req.cookies.recoveryCookie;
            const decoded = jsonwebtoken.verify(token, config.JWT.secret);
            if ( code !== decoded.ramdonCode){
                    return res.status (400).json({message: "Invalid code"});
            }            
            const newToken = jsonwebtoken.sing(
                    {email, decoded, email , userType: "Paciente", verified: true},
                    config.JWT.secret,
                    {expiresIn: "15m"}
            );

            res.cookie("recoveryCookie", newToken,{maxAge: 15*60*1000})
            return res.status(200).json({message:"Code verified succesfully"});
        } catch (error) {
            console.log("error" +error);
            return res.status(500).json({message:"Internal server error"})
            
        }
    };


recoveryPasswordController.newPassword = async(req, res) =>{
    try{
const {newPassword, confirmPassword} = req.body;
        if (newPassword !==confirmPassword){
            return res.status(400).json({message: "Password doesnt match"});
        }
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if(!decoded.verified){
            return res.status (400).json({message: "code not verified"});

        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await pacienteModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHash},
            {new:true},
            {new: true},

        );
        res.clearCookie("recoveryCookie");
        return res.statud(200).json({message: "Password updated"});
    }catch(error){
        console.log("error"+error);
        return res.status(500).json({message: "Internal server error"})

    }
};

export default recoveryPasswordController;