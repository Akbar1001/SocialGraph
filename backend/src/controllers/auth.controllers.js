const UserModel=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


/**
 * @name registerUserController
 * @description Register a new user, expects username, email, password in the request
 * @access Public
 */
async function registerUserController(req,res) {
    
    try{
        const {username ,email,password ,interests} =req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                message:"Please Provide valid Credentials"
            })
        }

        const isUserAlreadyexists= await UserModel.findOne({
            $or:[{username},{email}]    //check for email amd Username
        })
        
        if(isUserAlreadyexists){
            return res.status(400).json({
                message:"User with the same username or email already exists"
            })
        }

        const hashedPassword= await bcrypt.hash(passward,10);

        const user = await UserModel.create({
            username,
            email,
            password:hashedPassword,
            interest,
        });

        const token=jwt.sign({id: user._id,username:user.username },process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token);

        res.status(200).json({
            message:"User registered Successfully",
            token,
            data:{
                user:{
                    id:user._id,
                    username:user.username,
                    email:user.email,
                },
                token: token
            }
        })

    }catch(err){
        res.status(500).json({
            message:" Registration Failed"
        })
    }
};


/**
 * @name loginUserControllers
 * @description Login an existing user
 * @access Public
 */

async function loginUserControllers(req,res){

    try{
        const {email,password}=req.body;

        const user= await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"User with this email doesnot exist"
            })
        }

        const ispasswordvalid= await bcrypt.compare(password,user.password);
        if(!ispasswordvalid){
            return res.status(400).json({
                message:"Invalid password for this email"
            })
        }




    }catch(err){
        res.status(400).json({
            mesaage:"Error occured while Login! Try again"
        })
    }
}

