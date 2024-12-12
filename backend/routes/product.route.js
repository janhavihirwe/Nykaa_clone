const mongoose=require("mongoose")
const ProductModel=require("../models/product.model")
const role=require("../middleware/role")
const auth=require("../middleware/auth")
const express=require("express")
const productRoute=express.Router()

productRoute.get("/category/:category",async(req,res)=>{
    const {category}=req.params
    try{
        const product=await ProductModel.find({category})
        if(product.length===0){
            return res.json({message:"No products available"})
        }
        res.status(200).json({product})
    }
    catch(err){
        res.json({message:`${err}`})
    }
})

productRoute.use(auth)

productRoute.post("/create-product",role(["admin"]),async(req,res)=>{
    const {imgURL,category,price,discounted_price,rating,title,sizes,brand,fit}=req.body
    try{
        const product=await ProductModel({
            imgURL,
            category,
            brand,
            fit,
            price,
            discounted_price,
            rating,
            title,
            sizes
        })
        await product.save()
        res.json({product})
    }
    catch(err){
        res.json({message:`${err}`})
    }
})



module.exports=productRoute