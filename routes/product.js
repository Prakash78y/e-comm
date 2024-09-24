const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const {validateProduct} = require('../midillware/validateProduct');
const {isLoggedin}=require("../midillware/isLoggedin");
//multer for uploading files
const multer=require('multer');
const {storage}=require("../cloudinary.js");
const upload=multer({storage});
const methodOverride=require("method-override");


router.get('/products',async (req,res)=>{
    const products = await Product.find({});
    res.render('product/index',{products})
})

router.get('/product/new', isLoggedin,(req,res)=>{
   
    res.render('product/new');
})

router.post('/products',upload.single('image'),async(req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,filename)
    const image={url,filename}
   const {name,price,desc} = req.body;
   await Product.create({image,name,price,desc});

   req.flash('success','Product created Succesfully')
   res.redirect('/products')
})

router.get('/products/:id',isLoggedin,async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id).populate('reviews');
    res.render('product/show',{product})
});

router.delete('/products/:id',isLoggedin,async (req,res)=>{
  const {id} = req.params;
   await Product.findByIdAndDelete(id);
   req.flash('success','Product deleted Succesfully')
   res.redirect('/products')


})

module.exports = router;