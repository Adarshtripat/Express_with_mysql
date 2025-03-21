import express from "express";
import { adminLogoutController, adminViewUserController,adminDeleteUserController,adminUpdateUserController,adminUserUpdateController } from "../controller/admincontroller.js";

var adminRouter = express.Router()
adminRouter.get("/home",(request,response)=>{
response.render("AdminProfile",{email:request.session.email})
});
adminRouter.get("/viewUsers",adminViewUserController)
adminRouter.get("/logout",adminLogoutController);
adminRouter.get("/delete/:email",adminDeleteUserController);
adminRouter.get("/update/:email",adminUpdateUserController)
adminRouter.post("/updateuser",adminUserUpdateController)
export default adminRouter;