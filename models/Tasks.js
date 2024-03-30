 const mongoose = require("mongoose");
import {model,models} from "mongoose";

const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        trim:true,
        required:[true,"must provide a message"],
        maxlength:[40,"Characters should be less than 40"]
    }
},{timestamps:true});

// module.exports = mongoose.model("Task",taskSchema)
module.exports = models?.Task || model("Task",taskSchema)