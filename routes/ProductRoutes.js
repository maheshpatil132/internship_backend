const express = require('express');
const { createproduct, getallproduct, getsingleproduct, updateProduct, deleteProduct, updatemanyproduct, get8product } = require('../controller/ProductController');


const app = express.Router()


// routes

const CreateProduct = app.post('/new/product',createproduct) //create product
const GetallProduct = app.get('/products',getallproduct) //create product
const Get8Product = app.get('/get/products',get8product) //create product
const GetSingleProduct = app.get('/product/:id',getsingleproduct) //create product
const UpdateProduct = app.put('/product/:id',updateProduct) //create product
const UpdateManyProduct = app.put('/update/products',updatemanyproduct) //create product
const DeleteProduct = app.delete('/product/:id',deleteProduct) //delete product









// exports
module.exports = { CreateProduct , GetallProduct , GetSingleProduct , UpdateProduct ,Get8Product, DeleteProduct , UpdateManyProduct}