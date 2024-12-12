const UserModel=require("../models/user.model")
const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const userRoute=express.Router()

userRoute.post("/register",async(req,res)=>{
    const {name,email,phone,password,role}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(user){
            return res.json({message:"User already exist"})
        }
        bcrypt.hash(password, 5 ,async(err, hash)=>{
            if(err){
                return res.json({message:"Erroer while hashing password"})
            }
            const user1=await UserModel({
                name,
                email,
                phone,
                password:hash,
                role
            })
            await user1.save()
            return res.status(200).json({message:"User registered successfully",user1})
        });
    }
    catch(err){
        res.json({message:`${err}`})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {phone,password}=req.body
    try{
        const user=await UserModel.findOne({phone})
        if(!user){
            return res.json({message:"You seem a new user,please register first"})
        }
        bcrypt.compare(password, user.password, async(err, result)=>{
           if(err){
            return res.json({message:"Invalid credentials"})
           }
           if(result){
            const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES_IN})
            res.status(200).json({message:"Login successful",token})
           }
           else{
            return res.status(400).json({message:"Wrong credentials"})
           }
        });
    }
    catch(err){
        res.json({message:`${err}`})
    }
})

module.exports=userRoute