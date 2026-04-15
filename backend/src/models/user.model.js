const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    username:{  type:String, required:true},
    email:{ type:String, required:true , unique:true},
    password:{type:String , required:true},
    interests : [{type:String}],
},{
    timestamps:true
})

userSchema.index({ interests:1 });

const UserModel=mongoose.model("User",userSchema);

module.exports=UserModel;