const express = require('express');
const { createproduct, getallproduct, getsingleproduct, updateProduct, deleteProduct } = require('../controller/ProductController');


const app = express.Router()


// routes

const CreateProduct = app.post('/new/product',createproduct) //create product
const GetallProduct = app.get('/products',getallproduct) //create product
const GetSingleProduct = app.get('/product/:id',getsingleproduct) //create product
const UpdateProduct = app.put('/product/:id',updateProduct) //create product
const DeleteProduct = app.delete('/product/:id',deleteProduct) //delete product








// exports
module.exports = { CreateProduct , GetallProduct , GetSingleProduct , UpdateProduct , DeleteProduct}