const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  name:{
    firstname:{
      type: String,
      required:true,
      minlength:[3,'First Name must be at least 3 characters']
    },
    lastname:{
      type: String,
      minlength:[3,'Last Name must be at least 3 characters']
    }
  },
  email:{
    type: String,
    required:true,
    unique:true,
  },
password:{
  type: String,
  required:true,
  select:false, 
  minlength:[6,'Password must be at least 6 characters long']
},
socketId:{
  type: String
},
status:{
  type: String,
  enum:['active','inactive'],
  default:'inactive'
},
vehicle:{
  color:{
    type: String,
    required:true,
    minlength:[3,'Vehicle color must be at least 3 characters']
  },
  plate:{
    type: String,
    required:true,
    unique:true,
    minlength:[6,'Vehicle plate must be at least 6 characters long']
  },
  capacity:{
    type: Number,
    required:true,
    min:[1,'Capacity must be at least 1']
  },
  type:{
    type: String,
    required:true,
    enum:['car','motorcycle','auto']
  }
},
location:{
  ltd:{
    type: Number
  },
  lng:{
    type: Number
  }
}

})

captainSchema.methods.generateAuthToken = function (){
  const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn:'24h'});
  return token;
}

captainSchema.methods.comparePassword=async function(password){
  return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword=async function(password){
  return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;