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
         type:String,
       },
       watchHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
       }]

    },{timestamps:true}
)
userSchema.pre("save",async function(next){
     if(!this.isModified("password")) return next() 
     this.password=await bcrypt.hash(this.password,10)
     next()
})
userSchema.methods.isPasswordCorrect=async function(password){
     await bcrypt.compare(password,this.password)  
}
userSchema.methods.generateAccessToken= function(){
   return jwt.sign({
      _id:this._id,
      username:this.username,
      fullname:this.fullname,
      email:this.email
   },
   process.env.ACCESS_TOKEN_SECRET,
   {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
   }
  )
}
userSchema.methods.generateRefreshToken=function(){
   return jwt.sign(
      {
      _id:this._is
   },
   process.env.REFRESH_TOKEN_SECRET,
   {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
   }
  )
}
export const User=mongoose.model("User",userSchema)