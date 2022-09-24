const Errorhandler = require("../utils/errorhandler")
const jwt = require('jsonwebtoken')
const Buyer = require("../models/BuyerModel")
const { catchaysnc } = require("./catchaysnc")
const AdminModel = require("../models/AdminModel")
const SellerModel = require("../models/SellerModel")

exports.isAutharization = catchaysnc(async (req, res, next) => {
   const {token} = req.cookies
   if(!token){
      return next(new Errorhandler('please Login for Access this the Resouces',401))
   }
   const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY)
   req.user = await Buyer.findById(decodeData.id)
   if(!req.user){
    return next(new Errorhandler("you don't have access of this route (buyer)",404))
  }
   next()
})

exports.isAdmin = catchaysnc(async (req, res, next) => {
  const {token} = req.cookies
  if(!token){
     return next(new Errorhandler('please Login for Access this the Resouces',401))
  }
  const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY)
  req.user = await AdminModel.findById(decodeData.id)
  if(!req.user){
    return next(new Errorhandler("you don't have access of this route (admin) ",404))
  }
  next()
})


exports.isSeller = catchaysnc(async (req, res, next) => {
  const {token} = req.cookies
  if(!token){
     return next(new Errorhandler('please Login for Access this the Resouces',401))
  }
  const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY)
  req.user = await SellerModel.findById(decodeData.id)
  
  if(!req.user){
    return next(new Errorhandler("you don't have access of this route (seller) ",404))
  }
  if(!req.user.Aprroved){
    return next(new Errorhandler('your account are not verified',401))
  }
 
  next()
})



exports.autherizesrole = (...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role) || !req.user){
      next(new Errorhandler(`Role : ${req.user.role} is not allowed`))
    }
   next()
  }
}


exports.isOurUser = catchaysnc(async (req, res, next) => {
  const {token} = req.cookies
  if(!token){
     return next(new Errorhandler('please Login for Access this the Resouces',401))
  }
  const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY)
  if(decodeData.role==='buyer'){
  req.user = await Buyer.findById(decodeData.id).select('+password')
  }else if(decodeData.role==='seller'){
  req.user = await SellerModel.findById(decodeData.id).select('+password')
  }else if(decodeData.role==='admin'){
    req.user = await AdminModel.findById(decodeData.id).select('+password')
  }
  if(!req.user){
   return next(new Errorhandler("your session is expired ! please Login again :)",404))
 }
  next()
})
 