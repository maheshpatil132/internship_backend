const { default: mongoose } = require("mongoose");
const { catchaysnc } = require("../middleware/catchaysnc");
const db = require("../models/OrderModel");
const BuyerModel = require("../models/BuyerModel");
const ProductModel = require("../models/ProductModel");


const Errorhandler = require("../utils/errorhandler");


// create
exports.createorder = catchaysnc(async (req, res, next) => {
    const { product, quantity , buyer_pincode , remark} = req.body
    const data = {
        buyer: req.user._id,
        product,
        quantity,
        buyer_pincode,
        remark
    }
    const order = new db({ ...data })
   

    const buyer = await BuyerModel.findByIdAndUpdate(req.user._id , {$push:{
        bids : order._id
    }})
   
    console.log(product)
    const prod = await ProductModel.findById(product)

    if(!prod){
        return next(new Errorhandler('product not exist',404))
    }

    if(!buyer){
        return next(new Errorhandler("buyer not found", 404))
    }
     
    await order.save()
    await buyer.save()

    res.status(200).json({
        success: true,
        message: 'your order is created',
        buyer
    })
})

// update order   

// 1. update status / finalprice  == admin
exports.adminupdates = catchaysnc(async (req, res, next) => {

    const order = await db.findByIdAndUpdate(req.body.id, { ...req.body }, { new: true }).populate('product',{name:1,_id:1}).populate('bids.seller',{name:1})


    if (!order) {
        return next(new Errorhandler('order not found', 404))
    }
    await order.save()
    res.status(200).json({
        success: true,
        message: "order updated successfully",
        order
    })

})

// 2. update negotitation ==  buyer
exports.buyerupdates = catchaysnc(async (req, res, next) => {

    const order = await db.findByIdAndUpdate(req.body.id, { ...req.body }, { new: true })

    if (!order) {
        return next(new Errorhandler('order not found', 404))
    }
    await order.save()
    res.status(200).json({
        success: true,
        message: "order updated successfully",
        order
    })

})

// 3. create/add bids == seller
exports.sellerupdates = catchaysnc(async (req, res, next) => {

    const { price } = req.body

    const data = {
        seller: req.user._id,
        price
    }
    const order = await db.findById(req.body.id)

    if (!order) {
        return next(new Errorhandler('order not found', 404))
    }

    const isBided = order.bids.find(rev => rev.seller.toString() === req.user._id.toString())

    if (isBided) {

        order.bids.forEach(rev => {
            if (rev.seller.toString() === req.user._id.toString()) {
                rev.price = price
            }
        })
    } else {
        order.bids.push(data)
    }

    await order.save()

    res.status(200).json({
        success: true,
        message: "order updated successfully",
        order
    })

})


// get all order
exports.getallorders = catchaysnc(async (req, res, next) => {
    const orders = await db.find({}).sort({'createdAt':-1}).populate('product',{name:1,_id:1}).populate('buyer',{name:1})
    res.status(200).json({
        success: true,
        orders
    })
})

// get single order
exports.getsingleorder = catchaysnc(async (req, res, next) => {
    const order = await db.findById(req.params.id).populate('product',{name:1,_id:1}).populate('bids.seller',{name:1})

    if (!order) {
        return next(new Errorhandler("order not found", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})


// get all seller's quoate
exports.getallquoate = catchaysnc(async (req, res, next) => {
    const quotes = await db.findById(req.params.id, {bids:1, _id:0}).populate('bids.seller',{name:1,_id:0});
    if (!quotes) {
        return next(new Errorhandler("order does not exist", 404))
    }
    const bids = await quotes.bids
    res.status(200).json({
        success: true,
        bids
    })

})


// get single quoate

exports.getquote = catchaysnc(async (req, res, next) => {
    const { id } = req.params
    const { order } = req.params
    const quote = await db.findById(order,{ _id: 0, bids: { $elemMatch: { _id: id } } }).populate('bids.seller', { name: 1, _id: 0 })

    if(!quote){
        return next(new Errorhandler("order does not exist" , 404))
    }
    
    res.status(200).json({
        quote
    })
})


// admin have selected
exports.addminaccepted = catchaysnc(async(req,res,next)=>{
  const arr = [{
    seller:req.body.seller,
    price:req.body.price
  }]

  const order = await db.findByIdAndUpdate(req.params.id,{$set:{
   winner:arr,
   quote_status:'accepted'
  }} , {new:true})

  if(!order){
    return next(new Errorhandler('order not exist',404))
  }
 
 await order.save()

  res.status(200).json({
    success:true,
    order
  })
})




// reject / delete quoate
