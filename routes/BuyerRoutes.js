const express = require('express');
const { createbuyer, getbuyers, getsinglebuyer, loginbuyer, logoutbuyer, Updatebuyer, deletebuyer, getallBuyerBids ,accpetquote, autologin } = require('../controller/BuyerController');
const { isAutharization, autherizesrole, isAdmin, isOurUser } = require('../middleware/auth');


const app = express.Router()


const newbuyer =  app.post('/new/buyer' , createbuyer)
const GetBuyers =  app.get('/buyers' , isAdmin , autherizesrole('admin') ,getbuyers)
const GetSingleBuyer =  app.get('/buyer/:id' , getsinglebuyer)
const LoginBuyer =  app.post('/login/buyer' , loginbuyer)
const LogoutBuyer = app.get('/logout/buyer',logoutbuyer)
const UpdateBuyer = app.put('/update/buyer',isAutharization,Updatebuyer)
const DeleteBuyer =  app.delete('/buyer/:id', isAdmin ,autherizesrole('admin'),deletebuyer)
const GetBuyerBids =  app.get('/getall/buyer/bids' , isAutharization , getallBuyerBids )
const Accpetquote=app.put("/buyer/accpetquote/:id",isAutharization,accpetquote)
const AutoLogin = app.get('/auto/login', isOurUser , autologin)






module.exports = {newbuyer , GetBuyers , GetSingleBuyer , LoginBuyer , LogoutBuyer , UpdateBuyer , DeleteBuyer , GetBuyerBids , Accpetquote,AutoLogin}