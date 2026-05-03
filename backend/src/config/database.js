const mongoose=require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database Successfully");

    }catch(err){
        console.log("not able to connect with database");
        console.log(err);
    }
}
module.exports=connectDB;