import mongoose from "mongoose";
const videoSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            index:true,
            hash:true
        },
        url:{
            type:String,
            required:true,
            unique:true
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,

        },
        duration:{
            type:Number,
            required:true,

        }
    },{timestamps:true})
    export const Video=mongoose.model("Video",videoSchema)