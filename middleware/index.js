var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
     if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
        if(err)
        {
            req.flash("error","Campground Not found");
            res.redirect("back");
        }
        else{
            if(foundCampground.author.id.equals(req.user._id)){
                //res.render("campgrounds/edit",{campground:foundCampground});    
                next();
            }
            else{
                //res.send("You Do not have access to do that");
                req.flash("error","You don't have permission to do that");
                res.redirect("back");
            }
         
        }
    });
    }else{
        req.flash("err","You need to be logged in to do that");
       res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err)
        {
            res.redirect("back");
        }
        else{
            if(foundComment.author.id.equals(req.user._id)){
                next();
            }
            else{
                //res.send("You Do not have access to do that");
                req.flash("error","You don't have permission to do that");
                res.redirect("back");
                
            }
         
        }
    });
    }else{
        req.flash("err","You need to be logged in to do that");
       res.redirect("back");
    }
};


middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that ");
    res.redirect("/login");

};


module.exports=middlewareObj;