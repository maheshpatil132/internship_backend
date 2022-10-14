const mongoose = require('mongoose');
const { Schema } = mongoose;

const Products = new Schema({
    name: {
        type: String,
        required:true,
    },
    Substance: {
        type: String,
        required:true,
    },
    CASNo: {
        type: String,
        required:true,
    },
    EINECS: {
        type: String,
        required:true,
    },
    MinPurity: {
        type: String,
        required:true,
    },
    Color: {
        type: String,
        required:true,
    },
    Apperance: {
        type: String,
        required:true,
    },
    Category: {
        type: String,
        required:true,
    },
    Synonyms: {
        type: String,
        required:true,
    },
    desc: {
        type: String,
       
    },
    documents: {
        type: String,
    },    
    sellers : [{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'seller'
    }],
    img:{
        
    },
    category:{
        type:String,
        
    }
});

module.exports = mongoose.model("product", Products);