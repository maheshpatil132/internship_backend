const mongoose = require('mongoose');
const { Schema } = mongoose;

const Products = new Schema({
    name: {
        type: String,
        required:true,
    },
    Substance: {
        type: String,
    },
    CASNo: {
        type: String,
    },
    EINECS: {
        type: String,
    },
    MinPurity: {
        type: String,
    },
    Color: {
        type: String,
    },
    Apperance: {
        type: String,
    },
    Category: {
        type: String,
    },
    Synonyms: {
        type: String,
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