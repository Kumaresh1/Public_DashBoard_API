const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    User_Id: {type:String, unique:true},
    First_Name: {type: String},
    Last_name: {type:String},
    email: {type:String, 
            unique:true, 
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: {type: String},
    Address: {type:String},
    City: {type: String},
    State: {type: String},
    Zip : {type: Number}
}, {collection: 'Publicsignup'}  
)

module.exports = mongoose.model('user', userSchema)