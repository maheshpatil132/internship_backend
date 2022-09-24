const express = require('express');
const { createorder, getallorders, getsingleorder, adminupdates, buyerupdates, sellerupdates, getallquoate, getquote, addminaccepted } = require('../controller/OrderContoller');
const { isAutharization, isAdmin, isSeller, autherizesrole } = require('../middleware/auth');

const app = express.Router()



// all routes

const CreateOrder = app.post('/new/order', isAutharization , createorder)
const GetAllOrder = app.get('/getall/orders',getallorders)
const GetSingleOrder = app.get('/order/:id',getsingleorder)
const AdminUpdates = app.put('/updates/order/admin', isAdmin, adminupdates)
const BuyerUpdates = app.put('/updates/order/buyer',  isAutharization , buyerupdates)
const SellerUpdates = app.put('/updates/order/seller', isSeller , sellerupdates)
const GetAllQuotes = app.get('/:id/quotes', isAdmin , getallquoate )
const GetQuote = app.get('/:order/:id', isAdmin , getquote )
const AdminAccepted = app.put('/admin/accept/:id',isAdmin,addminaccepted)




module.exports = { CreateOrder , GetAllOrder , GetSingleOrder , AdminUpdates , SellerUpdates , BuyerUpdates , GetAllQuotes , GetQuote , AdminAccepted}
