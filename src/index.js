import connectDB from "../db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path:'./.env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`listning on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB CONNECTION FAILED",err)
})
