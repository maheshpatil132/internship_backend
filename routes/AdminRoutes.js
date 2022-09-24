const express = require('express');
const { createadmin, loginadmin, aproveseller, rejectseller, addproduct, getallsellerrequest, getalladdprodrequest, adminrejectorder,adminclickprocess, sendrfqadmin, adminupdateprice  } = require('../controller/AdminController');
const { isAutharization, autherizesrole, isAdmin } = require('../middleware/auth');


const app = express.Router()


// routes
const CreateAdmin = app.post('/new/admin', createadmin)
const LoginAdmin = app.post('/login/admin',loginadmin)
const ApproveSeller = app.put('/aproved/seller/:id',isAdmin  ,aproveseller)
const RejectSeller = app.put('/reject/seller/:id',isAdmin , rejectseller)
const AddProduct = app.post('/request/addprod',isAdmin , addproduct)
const GetAllSellerRequest = app.get('/getall/request/seller',isAdmin,getallsellerrequest)
const GetAllProdRequest = app.get('/getall/request/product' , isAdmin , getalladdprodrequest)
const Rejectorder= app.put("/reject/admin/order",isAdmin,adminrejectorder)
const Adminclickprocess=app.get("/admin/click/process/:id",isAdmin,adminclickprocess)
const Sendrfqadmin=app.put("/admin/click/sendrfq",isAdmin,sendrfqadmin)
const Adminupdateprice=app.put("/admin/updateprice/:id",isAdmin,adminupdateprice)

module.exports = { CreateAdmin , LoginAdmin , ApproveSeller , RejectSeller , AddProduct , GetAllSellerRequest , GetAllProdRequest ,Rejectorder , Adminclickprocess ,Sendrfqadmin ,Adminupdateprice}



