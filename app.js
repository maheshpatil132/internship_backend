const express = require('express');
const dotenv = require('dotenv');
const body = require('body-parser');
const http = require('http');
const cors = require('cors')
const { Server } = require('socket.io')
const connectDatabase = require('./configure/database');
const { newbuyer, GetBuyers, GetSingleBuyer, LoginBuyer, LogoutBuyer, UpdateBuyer, DeleteBuyer, GetBuyerBids, AutoLogin } = require('./routes/BuyerRoutes');
const { CreateProduct, GetallProduct, GetSingleProduct, UpdateProduct, DeleteProduct } = require('./routes/ProductRoutes');
const error = require('./middleware/error');
const cookieParser = require("cookie-parser");
const { CreateSeller, SignUpSeller, LoginSeller, DeleteSeller, AddProdRequest ,Sellerquote ,Getsingleseller, Getallsellerquote} = require('./routes/sellerRoutes');
const { CreateAdmin, LoginAdmin, ApproveSeller, RejectSeller, AddProduct, GetAllSellerRequest, GetAllProdRequest , Rejectorder, Adminclickprocess, Sendrfqadmin, Adminupdateprice } = require('./routes/AdminRoutes');
const { CreateOrder, GetAllOrder, GetSingleOrder, AdminUpdates, BuyerUpdates, SellerUpdates, GetAllQuotes, GetQuote, AdminAccepted } = require('./routes/OrderRoutes');




const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['Get', 'post']
  }
})

app.use(cors({credentials:true,origin:'*'}))
app.use(cookieParser())
app.use(body.urlencoded({ extended: false }))
app.use(body.json())
express.json()

dotenv.config({ path: './configure/app.env' })


const PORT = process.env.PORT || 5000



// product routes
app.use(CreateProduct)
app.use(GetallProduct)
app.use(GetSingleProduct)
app.use(UpdateProduct)
app.use(DeleteProduct)


// buyer's Route
app.use(newbuyer)
app.use(GetBuyers)
app.use(GetSingleBuyer)
app.use(LoginBuyer)
app.use(LogoutBuyer)
app.use(UpdateBuyer)
app.use(DeleteBuyer)
app.use(GetBuyerBids)
app.use(AutoLogin)


// seller's Routes
app.use(CreateSeller)
app.use(SignUpSeller)
app.use(LoginSeller)
app.use(DeleteSeller)
app.use(AddProdRequest)
app.use(Getsingleseller)
app.use(Sellerquote)
app.use(Getallsellerquote)



// admin's routes
app.use(CreateAdmin)
app.use(LoginAdmin)
app.use(ApproveSeller)
app.use(RejectSeller)
app.use(AddProduct)
app.use(GetAllSellerRequest)
app.use(GetAllProdRequest)
app.use(Rejectorder)
app.use(Adminclickprocess)
app.use(Sendrfqadmin)
app.use(Adminupdateprice)

// order routes
app.use(CreateOrder)
app.use(GetAllOrder)
app.use(GetSingleOrder)
app.use(AdminUpdates)
app.use(BuyerUpdates)
app.use(SellerUpdates)
app.use(GetAllQuotes)
app.use(GetQuote)
app.use(AdminAccepted)

app.get('/',(req,res,next)=>{
  res.send('hello')
})

app.use(error)
connectDatabase(app, PORT)