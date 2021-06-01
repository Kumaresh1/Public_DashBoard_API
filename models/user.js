const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    User_Id: {type:String, unique:true},
    First_Name: {type: String},
    Last_Name: {type:String},
    email: {type:String, 
            unique:true, 
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: {type: String},
    Designation : {type: String},
    Department : {type: String},
    Employee_code: {type: Number},
    Office_Address: {type:String},
    City: {type: String},
    State: {type: String},
    Pincode : {type: Number}
},  { collection: 'Governmentsignup'}
)

module.exports = mongoose.model('user', userSchema)