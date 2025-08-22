import { Router } from "express";
import { registerUSer } from "../controllers/user.controller.js";
import { Upload } from "../middlewares/multer.middlewares.js"

const router=Router()
router.route("/register").post(
    Upload.fields([
        {
            name:"avatar",
            maxCount:1
        },{
            name:"coverimage",
            maxCount:1
        }
    ]),
    registerUSer)

export default router
