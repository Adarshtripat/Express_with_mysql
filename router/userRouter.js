import express from "express";
import { userRegistration,userlogin,UserLogoutController,UserUpdateController,UpdateUserController } from "../controller/userController.js";
var userRouter = express.Router();
userRouter.get("/register",(request,response)=>{
    response.render("Register.ejs",{msg:""})
})
userRouter.get("/login",(request,response)=>{
    response.render("Login.ejs",{msg:""})
})
//aap home pe click kare to vhe ke vhe  rhe
userRouter.get("/home",(request,response)=>{
    response.render("userProfile",{msg:"",email:request.session.email})  
    });
userRouter.post("/registers",userRegistration)
userRouter.post("/login",userlogin)
userRouter.get("/viewProfile/:email",UserUpdateController)
userRouter.post("/updateuser",UpdateUserController)
userRouter.get("/logout",UserLogoutController);



export default userRouter;

