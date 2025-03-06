const mongoose = require('mongoose');

function connectToDatabase(){
  mongoose.connect(process.env.DB_CONNECT_URL).then(()=>{
    console.log("Connected to database!");
  }).catch(err => console.log(err));
}

module.exports = connectToDatabase;