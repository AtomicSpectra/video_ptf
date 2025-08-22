import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            index:true,
            hash:true
        },
        thumbnail:{
            type:String,
            required:true
        },
        views:{
            type:Number,
            required:true,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
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
        },
        watchHistory:[
            {
                
            }
        ]
    },{timestamps:true})
    export const Video=mongoose.model("Video",videoSchema)