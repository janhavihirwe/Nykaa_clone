const mongoose=require("mongoose")
const SliderModel=require("../models/slider.model")
const role=require("../middleware/role")
const auth=require("../middleware/auth")
const express=require("express")
const sliderRoute=express.Router()

sliderRoute.get("/category/:category",async(req,res)=>{
    const {category}=req.params
    try{
        const slider=await SliderModel.find({category})
        if(slider.length===0){
            return res.json({message:"No slider images available"})
        }
        res.status(200).json({slider})
    }
    catch(err){
        res.json({message:`${err}`})
    }
})

sliderRoute.use(auth)

sliderRoute.post("/create-slider",role(["admin"]),async(req,res)=>{
    const {imgURL,category,alternateName}=req.body
    try{
        const slider=await SliderModel({
            imgURL,
            category,
            alternateName
        })
        await slider.save()
        res.json({slider})
    }
    catch(err){
        res.json({message:`${err}`})
    }
})



module.exports=sliderRoute