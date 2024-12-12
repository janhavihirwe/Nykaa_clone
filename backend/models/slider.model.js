const mongoose=require("mongoose")
const sliderSchema=mongoose.Schema({
    imgURL:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    alternateName:{
        type:String,
        required:true
    }
},{versionKey:false})

const SliderModel=mongoose.model("slider",sliderSchema)
module.exports=SliderModel