const Errorhandler = require("../utils/errorhandler");

module.exports = (err,req,res,next)=>{
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error"


  //invalid route
  if(err.name === "CastError"){
    const message = `Resource not Found ! Due to the Invalid: ${err.path}`
    err = new Errorhandler(message,400)
  }


  // if(err.code = 1100){
  //   const message = `This ${Object.keys(err.keyValue)} are alreadey Exist`
  //   err = new Errorhandler(message,400)
  // }

  if(err.name === "JsonwebTokenError"){
    const message = `json web Token is invalid,Try again`
    err = new Errorhandler(message,400)
  }

  if(err.name === "TokenExpiredError"){
    const message = `json web Token is Expired,Try again`
    err = new Errorhandler(message,400)
  }

  res.status(err.statusCode).json({
    success : false,
    error : err.message,
  })


}