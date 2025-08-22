import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUSer=asyncHandler(async(req,res)=>{
    const [username,fullname,password,email]=res.body()
    //if(username){
    //    throw new ApiError
    //}
    if([username,fullname,password,email].some((fields)=>{
        fields?.trim===""
    })){
        throw new ApiError(400,"ALL FIELDS ARE REQUIRED")
    }
    existingUser=User.findOne({$or:[{username},{email}]})
    if(existingUser){
        throw new ApiError(409,"USER WITH THIS USERNAME OR EMAIL ALREADY EXISTS")
    }
    const avatarLocalPath=req.files?.avatar[0]?.path
    const coverLocalPath=req.files?.coverimage[0]?.path
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverimage=await uploadOnCloudinary(coverLocalPath)
    if(!avatar){
        throw new ApiError(400,"Avatar is required") 
    }
    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverimage:coverimage.url || "",
        password,
        email,
        username:username.toLowerCase()
    })
    const createdUser=User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
       throw new ApiError(400,"something went wrong") 
    }
    return res.status(201).json(
       new ApiResponse(200,createdUser,"user registered successfully")
    )
})
export {registerUSer}