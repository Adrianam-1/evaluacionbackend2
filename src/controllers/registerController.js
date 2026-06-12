import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
 
import pacientesModel from "../models/pacientes.js"
import { config } from "../config.js";

const registerPacientesController = {};

registerPacientesController.register = async( req, res) =>{
    try{
        let{
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut,
        } = req.body;
        const existPaciente = await pacientesModel.findOne ({email});
        if(existPaciente){
            return res.status(400).json({message: "email already in use"});
        }
        const passwordHash = await bcryptjs.hash(password,10);

        const newPaciente = new pacientesModel({
            name,
            lastName,
            birthdate,
            email,
            password: passwordHash,
            isVerified: isVerified || false, 
            loginAttempts,
            timeOut,
        });
        await newPaciente.save()

        const verificationCode = crypto.randomBytes(3).toString("hex");

         const tokenCode = jsonwebtoken.sign(
            {email, verificationCode},
            config.JWT.secret,
            {expiresIn: "15m"},
         );

         res.cookie("verificationTokenCookie", tokenCode,{
                maxAge: 15*60*1000,
         });

         const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user.email,

            }
         });

         const mailOptions = {
            from: config.email.user.email,
            to: email,
            subject: "Verificacion de cuenta",
            text:
            "Para verficiar tu cuenta, utiliza esta codigo:"  + 
            "expira en 15 minutos ",
         };
         transporter.sendMail(mailOptions,(error, info)=>{
            if(error){
                console.log("error" +error);
                return res.status(500).json({message: "error"});
            }
            res.status(200).json({message: "email send"});
         });
     } catch (error){
         console.log("error"+error)
         return res.status(500).json({message: "Internal server error"});
     }
};