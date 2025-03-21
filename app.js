import express from "express";
import expressSession from "express-session";
import dotenv from "dotenv";
import adminRouter from "./router/adminRouter.js";
import userRouter from "./router/userRouter.js";
import { createdb } from "./model/utills.js";

//import bodyParser from "body-parser"
var app = express();
dotenv.config();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());                       //body-parser ka use ayse ve kar sakte hy isme hame install nhe karna padta hy
 app.use(express.urlencoded({extended:true}))
app.use(createdb);
app.set("views","views");
app.set("view engine","ejs");
app.use(expressSession({secret:"process.env.SECRET",saveUninitialized:true,resave:true}));

app.use("/admin",adminRouter);
app.use("/user",userRouter);

app.get("/",(request,response)=>{
response.render("index")
})
app.listen(process.env.PORT,()=>{
    console.log("server connection successfully");
    
})