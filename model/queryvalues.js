export const insertvalues = (request)=>{
    const {username,email,password,address}=request.body;
  return [
    username,
    email, 
    password,
    address
];

}