const { catchaysnc } = require("../middleware/catchaysnc");
const db = require("../models/SellerModel");
const admin = require("../models/AdminModel")
const Errorhandler = require("../utils/errorhandler");
const sendtoken = require("../utils/jwttoken");
const OrderModel = require("../models/OrderModel");
const AdminModel = require("../models/AdminModel");




// send create request
exports.signuprequest = catchaysnc(async(req,res,next)=>{
  const email = "hiren@gmail.com"
  const request = await admin.findOneAndUpdate({email:email},
      {
        $push:{
          sellerReq : {...req.body}
        }
      }
    )

   if(!request){
    return next(new Errorhandler("admin not found" , 404))
   }
    res.status(200).json({
      success:true,
      message:"your request submited"
    })
})



// create seller
exports.createseller = catchaysnc(async(req,res,next)=>{
    const seller = new db({...req.body})
    await seller.save()
  
    // time to delete the seller req
    const admin = await AdminModel.findOneAndUpdate({email:"hiren@gmail.com"},{
      $pull:{
        sellerReq:{
          email:req.body.email
        }
      }
    })
  
      res.status(200).json({
        success:true,
        message:"New seller successfully created",
        seller
      })
})


// Add product request
exports.addrequest = catchaysnc(async(req,res,next)=>{
  const {id} = req.params
  const seller = await db.findById(req.user._id)

  if(!seller){
    return next(new Errorhandler("seller not found",404))
  }
   const data = {
    seller:seller._id,
    product:id
   }
  // add request
  const request = await admin.findOne({email:"hiren@gmail.com"})

  if(!request){
    return next(new Errorhandler("not",404))
  }

  await request.AddprodReq.push(data)


  await request.save()
  
  res.status(200).json({
    success:true,
    message:"you req. submitted"
  })
})



// update seller
exports.updateseller = catchaysnc(async(req,res,next)=>{
    const seller = await db.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!seller){
        return next(new Errorhandler('seller not Found',404))
    }
    await seller.save()
})

// delete seller
exports.deleteseller = catchaysnc(async(req,res,next)=>{
    const seller = await db.findByIdAndRemove(req.params.id)
    if(!seller){
        return next(new Errorhandler('seller not Found',404))
    }
    res.status(200).json({
        success:true,
        seller,
        message:"deleted successfully"
    })
})

// login seller
exports.loginseller = catchaysnc(async(req,res,next)=>{
    const {email , password} = req.body
     // check email or password is enterde or not
     if (!email || !password) {
      return next(new Errorhandler('please enter email or paswwrod', 401))
    }
    //find user
    const user = await db.findOne({ email }).select("+password")
    //if user not found send error message
    if (!user) {
      return next(new Errorhandler('user not found : Invalid email or password', 404))
    }
    //check the passwrod is correct or not
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return next(new Errorhandler('Invalid Email or Password'), 404)
    }
    //create token and store it in cookie
    sendtoken(user, 200, res);
  })
  

// logout seller
exports.logoutseller = catchaysnc(async (req, res, next) => {
    res.cookie(
      'token',
      null,
      {
        httpOnly: true,
        expires: new Date(Date.now())
      }
    )
    res.json({
      success: true,
      message: "successfully loged out the user "
    })
  })


// single seller
exports.getsingleseller = catchaysnc(async(req,res,next)=>{
    const id = req.params.id

  const seller = await db.findById(id)
  
  if(!seller){
    return next("user not found",404)
  }
  
  res.status.json({
    success : true,
    seller
  })
})

// getall sellers
exports.getsellers = catchaysnc(async(req,res,next)=>{
    const sellers = await db.find({})
    res.json({
        sucess:true,
        sellers
    })
})







// seller Qvotoes
exports.sellerquote = catchaysnc(async (req, res, next) => {
  let updateprice;

  const sellerid = req.user._id;
  const kimat = req.body.kimat;
  console.log(kimat)
  
  const orderid = req.params.id;

  const order = await OrderModel.findById(orderid);

  const isfound = order.bids.find(
    (seller) => seller.seller.toString() === sellerid.toString()
  );

  if (isfound) {
    order.bids.forEach((object) => {
      if (object.seller.toString() === sellerid.toString()) {
        object.price = kimat
      }
    });
  } else {
    return next(new Errorhandler("seller bid not exist"));
  }

  await order.save();

  res.status(200).json({
    order,
  });
});


exports.getallsellerquote = catchaysnc(async (req, res, next) => {
  const quotes = await db
    .findById(req.user._id, { bids: 1 })
    .populate('bids')
    .populate('bids.product')
  const sellerid = req.user._id
  if (!quotes) {
    return next(new Errorhandler('bids not exist', 404))
  }
  const bids = await quotes.bids
  res.status(200).json({
    success: true,
    bids,
    sellerid,
  })
})