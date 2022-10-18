const express = require('express');
const { createadmin, loginadmin, aproveseller, rejectseller, addproduct, getallsellerrequest, getalladdprodrequest, adminrejectorder,adminclickprocess, sendrfqadmin, adminupdateprice  } = require('../controller/AdminController');
const { isAutharization, autherizesrole  } = require('../middleware/auth');


const app = express.Router()


// routes
const CreateAdmin = app.post('/new/admin', createadmin)
const LoginAdmin = app.post('/login/admin',loginadmin)
const ApproveSeller = app.put('/aproved/seller/:id',isAutharization , autherizesrole('admin')  ,aproveseller)
const RejectSeller = app.put('/reject/seller/:id',isAutharization , autherizesrole('admin')  , rejectseller)
const AddProduct = app.post('/request/addprod',isAutharization , autherizesrole('admin')  , addproduct)
const GetAllSellerRequest = app.get('/getall/request/seller',isAutharization , autherizesrole('admin') ,getallsellerrequest)
const GetAllProdRequest = app.get('/getall/request/product' , isAutharization , autherizesrole('admin')  , getalladdprodrequest)
const Rejectorder= app.put("/reject/admin/order",isAutharization , autherizesrole('admin') ,adminrejectorder)
const Adminclickprocess=app.get("/admin/click/process/:id",isAutharization , autherizesrole('admin') ,adminclickprocess)
const Sendrfqadmin=app.put("/admin/click/sendrfq",isAutharization , autherizesrole('admin') ,sendrfqadmin)
const Adminupdateprice=app.put("/admin/updateprice/:id",isAutharization , autherizesrole('admin') ,adminupdateprice)

module.exports = { CreateAdmin , LoginAdmin , ApproveSeller , RejectSeller , AddProduct , GetAllSellerRequest , GetAllProdRequest ,Rejectorder , Adminclickprocess ,Sendrfqadmin ,Adminupdateprice}



