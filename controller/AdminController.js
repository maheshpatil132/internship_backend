const { catchaysnc } = require("../middleware/catchaysnc");
const db = require("../models/AdminModel");
const ProductModel = require("../models/ProductModel");
const SellerModel = require("../models/SellerModel");
const Errorhandler = require("../utils/errorhandler");
const sendtoken = require("../utils/jwttoken");
const OrderModel = require("../models/OrderModel");


// create admin
exports.createadmin = catchaysnc(async(req,res,next)=>{
    const admin = new db({...req.body})
    await admin.save()
    sendtoken(admin,200,res)
})


// login seller
exports.loginadmin = catchaysnc(async(req,res,next)=>{
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
  



// approve seller
exports.aproveseller = catchaysnc(async(req,res,next)=>{
  const {id} = req.params
  
  // update seller
  const seller = await SellerModel.findByIdAndUpdate(id,{Aprroved:true},{new:true})
  if(!seller){
    return next(new Errorhandler("seller not exist",404))
  }
  await seller.save()

  // delete request
  const admin = await db.findOne({email:"hiren@gmail.com"})
  
  const result = admin.sellerReq.filter(re=>re._id.toString() !== id.toString())
 
  await admin.updateOne({sellerReq:result},{new:true})

  admin.save()

  sendtoken(admin,200,res)
})



// reject seller
exports.rejectseller = catchaysnc(async(req,res,next)=>{
  const {id} = req.params
  const seller = await SellerModel.findByIdAndRemove(id)
  if(!seller){
    return next(new Errorhandler("seller not exist",404))
  }
  await seller.save()

  // delete request
  const admin = await db.findOne({email:"hiren@gmail.com"})
  
  const result = admin.sellerReq.filter(re=>re._id.toString() !== id.toString())
  
  await admin.updateOne({sellerReq:result},{new:true})
  admin.save()
  sendtoken(admin,200,res)
})


// add product
exports.addproduct = catchaysnc(async(req,res,next)=>{

  const addreq = req.body
  const user = await SellerModel.findByIdAndUpdate(addreq.seller , {$push:{
    products : addreq.product
  }} , {new:true})
  const products = await ProductModel.findByIdAndUpdate(addreq.product ,{$push:{
     sellers: addreq.seller
  }} , {new:true})
  
   
  if(!user){
    return next(new Errorhandler('seller not exist',404))
  }

  if(!products){
    return next(new Errorhandler('product not exist',404))
  }
   await user.save()
   await products.save()
   
   res.status(200).json({
    sucess:true,
    message:"product added sucessfully"
   })
})




// get all seller request
exports.getallsellerrequest = catchaysnc(async (req,res,next)=>{
  const email = "hiren@gmail.com"
  const admin = await db.findOne({email:email}).populate('sellerReq')
  if(!admin){
    return next(new Errorhandler('admin not found',404))
  }
  res.status(200).json({
    sucess:true,
    admin
  })
})


// get all add prod request
exports.getalladdprodrequest = catchaysnc(async (req,res,next)=>{
  const email = "hiren@gmail.com"
  const addrequs = await db.findOne({email:email},{Addreqs:1}).populate('AddprodReq.seller').populate('AddprodReq.product')
  if(!addrequs){
    return next(new Errorhandler('something Went Wrong',404))
  }
  res.status(200).json({
    sucess:true,
    addrequs
  })
})



// hiren
// admin rejcted the order
exports.adminrejectorder = catchaysnc(async (req, res, next) => {
  const orderid = req.body.id;
  const data = await OrderModel.findByIdAndUpdate(
    orderid,
    { quote_status: "rejected" },
    { new: true }
  );
  await data.save();
  res.status(200).json({
    sucess: true,
    data,
  });
});
/// admin when click process

exports.adminclickprocess = catchaysnc(async (req, res, next) => {
  const orderid = req.params.id;
  const order = await OrderModel.findById(orderid, {
    product: 1,
    _id: 0,
  }).populate("product", { sellers: 1, _id: 0 });
  res.status(200).json({
    sucess: true,
    order,
  });
});

// admin when click sendrfq button

exports.sendrfqadmin = catchaysnc(async (req, res, next) => {
  const id = req.body.id;
  const sellerdata = req.body.sellers;
  const sellersId = sellerdata.map(e=> e.seller)
  let seller;

  // console.log(sellerdata);
  const updatestate = await OrderModel.findByIdAndUpdate(
    id,
    { quote_status: "active", bids: sellerdata },
    { new: true }
  );

  if(!updatestate){
    return next(new Errorhandler('order not Exist',404))
  }
  

  const sellers = await SellerModel.updateMany({_id: { $in : sellersId}}, {
    $push: {
      bids: id,
    },
  })

  if(!sellers){
    await SellerModel.updateMany({_id: { $in : sellersId}}, {
      $pull: {
        bids: id,
      },
    })
  }

  
  await updatestate.save();

  res.status(200).json({
    sucess: true,
    updatestate
  });
});

/// when admin click the view details of particular object in admin panel

// when admin update price of seller quote
exports.adminupdateprice = catchaysnc(async (req, res, next) => {
  const orderid = req.params.id; 
  const price = req.body.kimat;
  const data = await OrderModel.findByIdAndUpdate(orderid, {
    buyer_Price: price,
  });
  
 await data.save()
  res.status(200).json({
    sucess: true,
   data
  })
  
});
