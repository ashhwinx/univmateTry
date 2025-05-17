const userModel = require("../model/user.model");


module.exports.createUser= async  ({fullname,email,password,section})=>{
    if (!fullname||!email ||!password  ||!section  ){
        throw new Error('All fields are require');
        
    }
    const user =  userModel.create({
        fullname,
        email,
        password,
  
        section

    })

    return user;
}

