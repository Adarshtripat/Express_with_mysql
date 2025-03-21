
import con from "../model/connection.js"


export const adminViewUserController =(request,response)=>{
var userListQuery = "SELECT * FROM users";        //list dikhane ke leye query chalaye ge
con.query(userListQuery,(error,result)=>{
    if(error){
        console.log("Error occured in user list" );
        
    }else{
        console.log("user list : ",result);
        response.render("adminUserList",{userList:result,email:request.session.email,msg:""})
        
    }
}); 
}
//logout part
export const adminLogoutController = (request,response)=>{
request.session.email="";
request.session.destroy();
response.redirect("/");
}


//delete part
export const adminDeleteUserController = (request,response)=>{
    const email = request.params.email      //data ko get karne ke leye hum parem ka use karte hy
    console.log("email:",email);
    var deleteQuery = "delete from users where email = ? ";  //delete query faire kare ge
    var deletevalue = [email];
    con.query(deleteQuery,deletevalue,(error,result)=>{
if(error){
    console.log("error while deleting user");
    
}else{
    console.log("result:",result);
    if(result.affectedRows!=0){
        var userListQuery = "SELECT * FROM users";       
        con.query(userListQuery,(error,result)=>{
            if(error){
                console.log("Error occured in user list" );
                
            }else{
                console.log("user list : ",result);
                response.render("adminUserList",{msg:"user Deleted Successfully",userList:result,email:request.session.email,msg:""})
                
            }
        }); 
    }else{
        var userListQuery = "SELECT * FROM users";       
        con.query(userListQuery,(error,result)=>{
            if(error){
                console.log("Error occured in user list" );
                
            }else{
                console.log("user list : ",result);
                response.render("adminUserList",{msg:"error by deleting user",userList:result,email:request.session.email,msg:""})
                
            }
        }); 
    }
}
    });   
}
//update part
export const adminUpdateUserController = (request,response,)=>{
   var email = request.params.email;  //isse hum email get kar le ge
//    console.log("Email:",email);
   var selectQuery = `select * from users where email='${email}'`;
//    console.log("selectQuery:",selectQuery);
   
   con.query(selectQuery,(error,result)=>{
    if(error){
        console.log("Error while getting data from");
        
    }else{
        console.log("received data :",result);
       
         response.render("adminUserUpdateFrom",{userData:result[0],email:request.session.email}); 
    }
   });
}


export const adminUserUpdateController = (request,response)=>{
    const {username,email,password,address} = request.body;
    var upadateQuery = "update users set username = ?,password = ?,address=? where email = ?";
    var updateValues = [username,password,address,email]
         con.query(upadateQuery,updateValues,(error,result)=>{
            if(error){
                console.log("Error occured",error);
                
            }else{
               // console.log((" Updatetd Result",result));  //affected row me 1 mila
               
                if(result.affectedRows==1){
                    var userListQuery = "SELECT * FROM users";       
                    con.query(userListQuery,(error,result)=>{
                        if(error){
                            console.log("Error occured in user list" );
                            
                        }else{
                           // console.log("user list : ",result);
                            response.render("adminUserList",{msg:"user profile updated Successfully",userList:result,email:request.session.email})
                            
                        }
                    }); 
                }else{
                    var userListQuery = "SELECT * FROM users";       
                    con.query(userListQuery,(error,result)=>{
                        if(error){
                            console.log("Error occured in user list" );
                            
                        }else{
                            //  console.log("user list : ",result);
                            response.render("adminUserList",{msg:"error by updating userProfile",userList:result,email:request.session.email,msg:""})
                            
                        }
                    }); 
                }
                
            }
         })
} 