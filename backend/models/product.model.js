const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
    imgURL:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    fit:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    discounted_price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    sizes:{
        type:[String]
    }
},{versionKey:false})

const ProductModel=mongoose.model("product",productSchema)
module.exports=ProductModel