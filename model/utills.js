//write code for create table in mysql
import con from "./connection.js";
export const createdb = (request,response,next)=>{
    console.log("gets entry");
    //mysql query to check whether database table exist or not
    var checkQuery = "SELECT count(*) as exist FROM information_schema.tables WHERE table_schema = 'expressdb' AND table_name = 'users'";  //ye query fix he hoti hy google se  nikale hy query ko
    con.query(checkQuery,(error,result)=>{
        if(error){
            console.log("error occured");   
        }
        else{
            console.log("result",result);
            if(result[0].exist==0){
                const createTable = "create table users (username varchar(255)not null,email varchar(255)not null primary key,password varchar(255)not null ,address varchar(255)not null)";        //Email primary ke hy primary key matlab hum dubara intery nhe kre sakte hy
                con.query(createTable,(error,result)=>{
                    if(error){
                        console.log("error occored while creating table");
                        
                    }else{
                        console.log("Result of table :",result);
                        console.log("table created successfully");
                        
                    }
                });
            }else{
                console.log("table allready created");
                
            }
            
            
        }
    })
    next();
}