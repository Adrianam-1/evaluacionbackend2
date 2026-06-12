import pacientesModel from "../models/pacientes.js";

import { v2 as cloudinary } from "cloudinary";

const pacientesController = {};


//  SELECT 
pacientesController.getAllDrivers = async (req, res ) => {
    try {
        const pacientes = await pacientesModel.find();
        return res.status(200).json(pacientes);
    } catch (error) {
        console.log("error"+error)
        return res.statur(500).json({message: "Internal server error"});
        
    }
};

//INSERT 
pacientesController.insertPacientes = async ( req, res) => {
    try {
        // solicito los datos que guardare
        const { name,lastName,email,password,birthdate,phone,address,bloodType,phoneEmergencyContacts } = req.body;
        const newPaciente = new pacientesModel({
            name,
            phone,
            profilePhoto: req.file.path,
            public_id: req.file.filename,
            lastName,
            email,
            password,
            phoneEmergencyContacts,
            birthdate,
            phone,
            address,
            bloodType
        })
        await newPaciente.save()
        return res.status(200).json({message: "Paciente guardado"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
    }
};


//ELIMINAR
pacientesController.deletePaciente = async ( req, res) =>{
    try {
         //busco el paciente que voy a eliminar
         const pacienteFound = await pacientesModel.findById(req.params.id)
         //elimino la imagen de cloudinary
         await cloudinary.uploader.destroy(pacienteFound.public_id)
         //elimino el paciente de la base de datos
         await pacientesModel.findByIdAndDelete(req.pparams.id )

         return res.status(200).json({message: "Paciente eliminado"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal server error "})
        
    }
};

//ACTUALIZAR
pacientesController.updatePacientes = async( req, res) => {
    try {
        const {name, phone, address, phoneEmergencyContacts} = req.body;
        const pacienteFound = await pacientesModel.findById(req.params.id)

        const updateData = {
            name,
            phone,
            address,
            phoneEmergencyContacts
        }
        //si trae imagen
        if(req.file){
            //eliminamos la imagen anterior
            await cloudinary.uploader.destroy(pacienteFound.public_id)
            updateData.profilrPhoto = req.file.path
            updateData.public_id = req.file.filename
        }

        //lo guardamos en la db
        await pacientesModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true}
        )
        return res.status(200).json({message: "paciente actualizado"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message:"Internal server error"})
        
    }
};

export default pacientesController