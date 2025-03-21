import mysql from "mysql2";
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"expressdb"
});
con.connect((error)=>{
    if(error)
        console.log("Error While connect");
    else
    console.log("connection to mysql database");     
});
export default con;