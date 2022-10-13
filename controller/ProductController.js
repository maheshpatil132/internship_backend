const { catchaysnc } = require("../middleware/catchaysnc");
const db = require("../models/ProductModel");
const Errorhandler = require("../utils/errorhandler");

// create product
exports.createproduct = catchaysnc(async(req,res,next)=>{
    const product = new db({...req.body})
    const create = await product.save()
    res.json({
        sucess:true,
        message : "product created",
        create
    })
})


// get -8 product
exports.get8product = catchaysnc(async(req,res,next)=>{
    const products = await db.find().populate('sellers',{_id:0,name:1}).limit(8)
    res.json({
        sucess:true,
        products
    })
})

exports.getallproduct = catchaysnc(async(req,res,next)=>{
  const products = await db.find().populate('sellers',{_id:0,name:1})
  res.json({
      sucess:true,
      products
  })
})



// single product
exports.getsingleproduct = catchaysnc(async(req,res,next)=>{
    const {id} = req.params
    const product = await db.findById(id).populate('sellers',{name:1})
    if(!product){
       return next(new Errorhandler('product not found',404))
    }
    res.json({
        sucess:true,
        product,
        status:200,
    })
})

// update product
exports.updateProduct = catchaysnc(async (req, res, next) => {
  
    const product = await db.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return next(new Errorhandler("Product Not Found", 404))
    }
    res.json({
      success: true,
      message: "product updated successfully",
      product
    })
})

// update many product
exports.updatemanyproduct = catchaysnc(async (req, res, next) => {
  
  const product = await db.updateMany({}, req.body, { new: true });
  if (!product) {
    return next(new Errorhandler("Product Not Found", 404))
  }
  res.json({
    success: true,
    message: "product updated successfully",
    product
  })
})

// delete product
exports.deleteProduct =catchaysnc( async (req, res, next) => {
    const product = await db.findByIdAndRemove(req.params.id);
    if (!product) {
      return next(new Errorhandler("Product Not Found", 404))
    }
    res.json({
      success: true,
      message: "product deleted successfully",
      product
    })
})

