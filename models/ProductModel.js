const mongoose = require('mongoose');
const { Schema } = mongoose;

const Products = new Schema({
    name: {
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