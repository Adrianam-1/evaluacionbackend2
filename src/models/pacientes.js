/*
name,
lastName,
email,
password,
birthdate,
phone,
address,
bloodType,
phoneEmergencyContacts [{
phone,
nameEmergencyContact
}],
profilrPhoto,
isVerified,
loginAttempts
timeOut
*/

import {Schema, model } from "mongoose"

const pacientesSchema = new Schema({
    name: {type: "string"},
    lastName: {type: "string"},
    email: {type: "string"},
    password: {type: "string"},
    birthdate: {type: "date"},
    phone: {type: "string"},
    address: {type: "string"},
    bloodType: {type: "string"},
    phoneEmergencyContacts :[{
        phone: {type: "string"},
        nameEmergencyContact : {type:"string"},
        }],
        profilePhoto: {type: "string"},
        isVerified: {type: "Boolean"},
        loginAttempts: {type: "Number"},
        public_id: {type: "string"},
        timeOut: {type: "Date"}

        },{
            timestampts: true,
            strict:false
})

export default model ("pacientes", pacientesSchema)