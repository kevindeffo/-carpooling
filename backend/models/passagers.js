const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const PassagersSchema = mongoose.Schema ({
    nom:{type:String,require:true},
    ville:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    telephone:{type:String,require:true},
    statut:{type:String,require:true},
    photo:{type:String,}
})

PassagersSchema .plugin(uniqueValidator);
module.exports = mongoose.model('Passagers',PassagersSchema)

