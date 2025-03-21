import con from "../model/connection.js";

//user registation part
export const userRegistration = (request,response)=>{     //named export hy ye kyo ki isme hum bariable ban ke export kar rhe hy
    console.log(request.body);
    const {username,email,password,address}=request.body;
    const insertquery = "insert into users(username,email,password,address)values(?,?,?,?)"//users table name hy
    const insertvalues = [username,email, password,address]

    con.query(insertquery,insertvalues,(error,result)=>{
        if(error){
            console.log("Error occured :",error);
            console.log("Error while Registration");
            response.render("register",{msg:"error while Registration "})
        }
         else{
            console.log("Result",result);
            console.log("Registration successfully");
            response.render("login",{msg:"Registration successfull"})
         }   
    })
}
//admin login part
export const userlogin = (request,response)=>{
    console.log(request.body);  //isse terminal me email password print ho jata hy
   const email =  request.body.email
   const password = request.body.password
    if(email==="admin@gmail.com" && password ==="admin@123"){
        request.session.email = request.body.email; //agar match ho jata hy to entry karbaye ge
        request.session.save();
        response.render("AdminProfile",{email:request.session.email});  //agar email password match hota hy to use ham use admin profile pe pahucha de ge
    }else{
        var selectQuery = "select * from users where email=? and password=?";
        var selectValue = [email,password];
        con.query(selectQuery,selectValue,(error,result)=>{
            if(error){
                console.log("error occourd while login:",error)
            }else{
               // console.log("user:",result);
               request.session.email = request.body.email; 
               request.session.save();
               response.render("userProfile",{msg:"",email:request.session.email});
            }

        })
    }
    
}
//update part
export const UserUpdateController = (request,response,)=>{
    var email = request.params.email;  //isse hum email get kar le ge
 //    console.log("Email:",email);
    var selectQuery = `select * from users where email='${email}'`;
 //    console.log("selectQuery:",selectQuery);
    
    con.query(selectQuery,(error,result)=>{
     if(error){
         console.log("Error while getting data from");
         
     }else{
         console.log("received data :",result);
        
          response.render("UserUpdateFrom",{userData:result[0],email:request.session.email}); 
     }
    });
 }
 export const UpdateUserController = (request,response)=>{
    const {username,email,password,address} = request.body;
    var upadateQuery = "update users set username = ?,password = ?,address=? where email = ?";
    var updateValues = [username,password,address,email]
         con.query(upadateQuery,updateValues,(error,result)=>{
            if(error){
                console.log("Error occured",error);
                
            }else{
               // console.log((" Updatetd Result",result));  //affected row me 1 mila
               
                if(result.affectedRows==1){
                    
                            response.render("userProfile",{msg:"profile updated successfully",email:request.session.email})
                }
                else{
                   
                            
                            response.render("userProfile",{msg:"Error while updating profile",email:request.session.email});
                            
                    
                }
                
            }
         })
} 
//user logout part
export const UserLogoutController = (request,response)=>{
    request.session.email="";
    request.session.destroy();
    response.redirect("/");
    }

