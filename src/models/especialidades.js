/*
specialityName,
description,
isAviable
*/

import {Schema, model} from "mongoose"

const especialidadesMedicasSchema = Schema({
    specialityName: {type: "string"},
    description: {type: "string"},
    isAviable: {type: "Boolean"}
},{
    timestampts: true,
    strict: false
})

export default model ("especialidadesMedicas", especialidadesMedicasSchema)