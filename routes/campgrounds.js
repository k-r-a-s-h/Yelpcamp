var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");

router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
       if(err)
       {
           console.log(err);
       }
       else{
           res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
   // res.render("campground",{campgrounds:campgrounds});
});

router.post("/",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name:name,image:image,description:desc,author:author};
    Campground.create(newCampground,function(err,newlyCreated){
        if(err)
        {
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    });
    
});

router.get("/new",middleware.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});

router.get("/:id", function(req, res) {
    // Find camground with ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
       if (err) {
           console.log(err);
       } else {
           //console.log(foundCampground);
           // Render show tempalte with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

//edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                req.flash("error","Campground not found");
            }
            res.render("campgrounds/edit",{campground:foundCampground});    
    });
});
//update campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
       if(err)
       {
           req.flash("error","Can't Update the campground");
           res.redirect("/campgrounds");
       }
       else{
           req.flash("success","Successfully Updated");
           res.redirect("/campgrounds/"+req.params.id);
       }
   }) ;
});

//destroy campground  route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
      if(err)
      {
          req.flash("error","Can't delete database");
          res.redirect("/campgrounds");
      }
      else{
          req.flash("success","Successfully deleted");
          res.redirect("/campgrounds");
      }
   });
});

//============middleware===================
// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }




module.exports=router;