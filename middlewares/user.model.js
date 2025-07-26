import mongoose,{Schema} from "mongoose"
const userSchema=new mongoose.Schema(
    {
       id:{
          type:String,
          required:true,
          unique:true,
       },
       username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
       },
       email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
       },
       fullname:{
        type:String,
        required:true,
        trim:true,
        index:true

       },
       avatar:{
        type:String,
        unique:true,
       },
       coverImage:{
        type:String,
        unique:true
       },
       password:{
        type:String,
        required:true,
        unique:true,
       },
       refreshToken:{

       },
       watchHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"

       }]

    },{timestamps:true}
)
export const User=mongoose.model("User",userSchema)