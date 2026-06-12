import especialidadesModel from "../models/especialidades.js"

const especialidadesController = {};

especialidadesController.getEspecialidades = async (req, res) => {
    try {
        const especialidades = await especialidadesModel.find();
        return res.status(200).json(especialidades);
    } catch (error) {
        console.log("error"+ error);
        return res.status(500).json({message: "Internal server error"});
        
    }
};

//Delete

especialidadesController.deleteEspecialidades = async ( req, res) => {
    try {
        const deleteEspecialidades = await especialidadesModel.findbyIdAndDelete(
            req.params.id,
        );
        if(!deleteEspecialidades){
            return res.status(404).json({message: "Especialidad not found"});

        }
        return res.status(200).json({message: "Especialidad deleted"})
    } catch (error) {
        console.log("error" +error);
            return res.status(500).json({message: "Internal server error"})
        }
    };


    //Update
    especialidadesController.updateEspecialidad = async (req, res) =>{
        try {
            let{
                    name,
                    specialityName,
                    description,
                    isAviable

            } = req.body; 

            name = name?.trim();
            email = email?.trim();
            if(name.length < 3 || name.length > 15){
                return  res.status(400).json({message: "Invalid name"});
            }

            const updateEspecialidad = await especialidadesModel.findByIdAndUpdate (
                req.params.id,{
                    name, 
                    specialityName,
                    description,
                    isAviable
                },
                {new: true},

            );
            if(!updateEspecialidad){
                return res.status(404).json({message: "Especialidad not found"});
            }
            return res.status(200).json({message: "Especialidad actualizada"});
        } catch (error) {
            console.log("error" +error);
            return res.status(500).json({message: "Internal server error"});
        }
    };

    export default especialidadesController;

    