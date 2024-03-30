const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("it's on")
        console.log("connected to DB")
    }catch(error){
        throw new Error("Error in connnecting to dB")
    }
}

module.exports = connectDB;