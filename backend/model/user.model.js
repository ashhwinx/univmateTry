const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    fullname: {
          type: String,
          require: true,
          minlength: [6, "Fullname name must be at least 6 characters long"],
    },
    email:{
      type:String,
      require:true,
      unique:true,
      minlength:[5,'Email must be at least 5 characters long']
    },
    password:{
      type:String,
      require:true,
      minlength:[6,'password must be at least 6 characters long'],
      select:false,
    },
    semester:{
      type:String,
        required: true,
        enum: ["A","B"]
    },
    section:{
        type:String,
        required: true,
        enum: ['A','B']
    }
    
  });



  userSchema.methods.generateAuthToken= function(){
    const token = jwt.sign({ _id: this._id },process.env.JWT_SECRET, { expiresIn: '24h' } )
      return token;
  }
  
  userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password, this.password);
  }
  
  userSchema.statics.hashPassword= async function(password){
    return await bcrypt.hash(password, 10);
  }
  
  const userModel = mongoose.model('user',userSchema);
  
  module.exports = userModel;