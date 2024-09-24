const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const {saveRedirectUrl}=require("../midillware/isLoggedin");

router.get('/signup',(req,res)=>{
    res.render('auth/signup')
})

router.post('/signup',async (req,res)=>{
    const {username,password,email,role} = req.body;
    // console.log(req.body)
    const newUser = new User({username,email,role});
    await User.register(newUser,password);
    res.redirect('/login')
})


router.get('/login',(req,res)=>{
    res.render('auth/login')
})

router.post('/login', saveRedirectUrl,
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    req.flash("success","Welcome to web");
    let redirectUrl= res.locals.redirectUrl || "/products";
    res.redirect(redirectUrl);
  });

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success','TRhank You! Visit again')
    res.redirect('/products');
  });
});

module.exports = router;