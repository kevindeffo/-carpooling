const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const ConducteursSchema = new mongoose.Schema ({
    nom:{type:String,require:true},
    ville:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    telephone:{type:String,require:true},
    statut:{type:String,require:true},
    photo:{type:String,require:true}
})

ConducteursSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Conducteurs',ConducteursSchema)