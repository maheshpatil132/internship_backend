const express = require('express');
const { createseller, updateseller, signuprequest, loginseller, deleteseller, addrequest, sellerquote, getsingleseller, getallsellerquote, getsellers } = require('../controller/SellerController');
const { isAutharization, autherizesrole, isAdmin, isSeller } = require('../middleware/auth');
const app = express.Router()



// seller Routes
const CreateSeller = app.post('/new/seller', createseller)
const UpdateSeller = app.put('/update/seller/:id', updateseller)
const LoginSeller = app.post('/login/seller', loginseller)
const DeleteSeller = app.post('/delete/seller/:id', isAdmin, deleteseller)
const AddProdRequest = app.post('/addprod/:id', isSeller, addrequest)
const Getsingleseller = app.get("/get/singleseller/:id", isSeller, getsingleseller)
const GetAllseller = app.get("/getall/sellers", isAdmin, getsellers)

const Sellerquote = app.put("/seller/quote/:id", isSeller, sellerquote)
const Getallsellerquote = app.get(
    '/seller/enquries',
    isSeller,
    getallsellerquote,
)
// seller sign up request
const SignUpSeller = app.put('/request/signup', signuprequest)




module.exports = { CreateSeller, SignUpSeller, LoginSeller, DeleteSeller, AddProdRequest, Sellerquote, Getsingleseller, Getallsellerquote , GetAllseller }