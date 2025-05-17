const userModel = require("../model/user.model");


module.exports.createUser= async  ({fullname,email,password,semester,section})=>{
    if (!fullname||!email ||!password ||!semester ||!section  ){
        throw new Error('All fields are require');
        
    }
    const user =  userModel.create({
        fullname,
        email,
        password,
        semester,
        section

    })

    return user;
}

