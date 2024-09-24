
module.exports.isLoggedin=(req,res,next)=>{

    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create listing")
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        //due to passport we have to save into locals
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

