const express = require('express');
const dotenv = require('dotenv');
const body = require('body-parser');
const http = require('http');
const cors = require('cors')
const connectDatabase = require('./configure/database');
const { newbuyer, GetBuyers, GetSingleBuyer, LoginBuyer, LogoutBuyer, UpdateBuyer, DeleteBuyer, GetBuyerBids, AutoLogin } = require('./routes/BuyerRoutes');
const { CreateProduct, GetallProduct, GetSingleProduct, UpdateProduct, DeleteProduct, UpdateManyProduct, Get8Product } = require('./routes/ProductRoutes');
const error = require('./middleware/error');
const cookieParser = require("cookie-parser");
const { CreateSeller, SignUpSeller, LoginSeller, DeleteSeller, AddProdRequest, Sellerquote, Getsingleseller, Getallsellerquote, GetAllseller, SendCreateReq, UpdateSeller } = require('./routes/sellerRoutes');
const { CreateAdmin, LoginAdmin, ApproveSeller, RejectSeller, AddProduct, GetAllSellerRequest, GetAllProdRequest, Rejectorder, Adminclickprocess, Sendrfqadmin, Adminupdateprice } = require('./routes/AdminRoutes');
const { CreateOrder, GetAllOrder, GetSingleOrder, AdminUpdates, BuyerUpdates, SellerUpdates, GetAllQuotes, GetQuote, AdminAccepted } = require('./routes/OrderRoutes');




const app = express()
const server = http.createServer(app)


app.use(cors({
  credentials: true, origin:['http://localhost:3000','https://www.maqure.in' , 'https://maqure.in', 'http://127.0.0.1:5500'], allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
}))
app.use(cookieParser())
app.use(body.urlencoded({ extended: false }))
app.use(body.json())
express.json()

dotenv.config({ path: './configure/app.env' })


const PORT = process.env.PORT || 5000


require("dotenv").config({path: "./app.env"});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

app.post("/send/otp", async (req, res) => {
  console.log(req.body.mobile);
  await client.verify.v2
    .services("VAeef441a312c66361c551e075ef2b452a")
    .verifications.create({ to:req.body.mobile , channel: "sms" })
    .then((verification) => console.log(verification.status));
});

app.post("/varify/otp", async (req, res) => {
  console.log(req.body);
  await client.verify.v2
    .services("VAeef441a312c66361c551e075ef2b452a")
    .verificationChecks.create({ to:req.body.mobile , code: req.body.otp })
    .then((verification_check) => res.send(verification_check.status));
});

// product routes
app.use(CreateProduct)
app.use(GetallProduct)
app.use(Get8Product)
app.use(GetSingleProduct)
app.use(UpdateProduct)
app.use(DeleteProduct)
app.use(UpdateManyProduct)




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
app.use(GetAllseller)
app.use(SendCreateReq)
app.use(UpdateSeller)



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

app.get('/', (req, res, next) => {
  res.send('hello')
})

app.use(error)
connectDatabase(app, PORT)