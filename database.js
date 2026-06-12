import mongoose, { connect } from "mongoose";
import { config } from "./src/config.js";

mongoose.connect (connect.db_URI)

const connection = mongoose.connection;

connection.once ("open",() =>{
console.log("BD is connected")
})
connection.on("disconnected", () =>{
    console.log("DB is disconected")
})
connection.on("error",(error)=>{
    console.log("error found" + error)
})