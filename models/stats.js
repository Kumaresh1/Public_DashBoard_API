const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    State: {type:String, required:true},
    Population: {type: Number, required:true},
    Confirmed: {type: Number, required:true},
    Recovered: {type: Number, required:true},
    Deaths:{type: Number, required:true},
    Active:{type: Number, required:true},
    Tested:{type: Number, required:true},
    Last_Updated_Time:{type: String}
},  { collection: 'Govcovidvisualization'}
)

module.exports = mongoose.model('Profile', profileSchema)