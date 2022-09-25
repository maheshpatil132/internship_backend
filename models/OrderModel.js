const mongoose = require('mongoose');


const OrderModel = mongoose.Schema({
   buyer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'buyer',
      required:true  
   },     
   product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'product',
      required:true
   },  
   quantity: {
      type: Number,
      required:true
   },
   buyer_pincode:{
     type:Number,
     required:true
   },
   remark: {
      type: String,
   }, 
   winner:[{
      seller:{
         type: mongoose.SchemaTypes.ObjectId,
         ref:'seller',
      },
      price:{
         type:Number,
      }
   }],
   bids: [{
      seller: {
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'seller'
      },
      price: {
         type: Number,
         default:null
      },
   }
   ],
   quote_documents: [
      { type: String, }
   ],
   timer: {
      type:Date
   },
   buyer_Price:{
      type:Number,
      default:000

   },
   negotation:{
      type:Boolean,
      default:false
   },
   quote_status: {
      type: String,
      default: 'processing'
   }, 
   seller_invoice: {
      type: String,
     
   },
   buyer_invoice :{
      type: String,

   },
   buyer_payment : {
      type: Boolean,
      default: false
   },
   seller_payment : {
      type: Boolean,
      default: false
   },
   order_status: {
      type: String,
      default: "preparing"
   },
   query: {
      type: String
   },

   createdAt: {
      type: Date,
      default: Date.now,
    },
});



module.exports = mongoose.model('order',OrderModel)