const express=require("express");
const cors=require("cors");



const app=express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("SocialGraph API is running ")
});

module.exports = app;