const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const SellerModel = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  employees: {
    type: Number,
    
  },
  companyName:{
    type:String
  },
  address:{
    type:String
  },
  Category: {
    type: String,
    required: true
  },
  Area:{
    type:String,
    required:true
},
cin:{
  type:String,
  required:true
},
gst:{
  type:String,
  required:true
},

mobile:{
  type:Number,
  required:true
},
capacity:{
  type:Number,
  required:true
},
linkedin:{
  type:String,
  
},
about:{
  type:String,
  required:true
},

  email: {
    type: String,
    required: true,
    validator: [validator.isEmail, "Please Enter the valid Email"]
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "seller"
  },
  
  products: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'product',
      aprrove: {
        type: Boolean,
        default: null
      }
    }
  ],
  bids: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'order'
    }
  ]

})


SellerModel.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

// generate the token
SellerModel.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET_KEY)
  return token
}

// compare the password
SellerModel.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

//resetpassword token generate
SellerModel.methods.getresetToken = function () {
  const resettoken = crypto.randomBytes(20).toString('hex')
  this.resetpasswordToken = crypto.createHash('sha256')
    .update(resettoken)
    .digest('hex');
  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000
  return resettoken
}




module.exports = mongoose.model('seller', SellerModel)