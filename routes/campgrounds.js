var express = require("express");
var router = express.Router();
var Campground    = require("../models/campground");
var middleware = require("../middleware");

router.get("/campgrounds", function(req, res){
    //get data from db
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log("Error");
            //console.log(err);
        }else{
            console.log("Success");
            //console.log(allcampgrounds);
            res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    });
});

router.post("/campgrounds", middleware.isLoggeedIn, function (req, res){
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        author: author
    },function(err, newcreate){
        if(err){
            console.log("Error on create");
            //console.log(err);
        }else{
            //redirect
            res.redirect("/campgrounds");
        }
    });
   
});

router.get("/campgrounds/new", middleware.isLoggeedIn, function(req, res){
    res.render("campgrounds/new");
});

//show more info for the campground
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground do not exist!");
            console.log("error on into the info page");
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//edit campground route
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwner, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
    });
});
//update camoground route
router.put("/campgrounds/:id", middleware.checkCampgroundOwner, function(req, res){
    Campground.findOneAndUpdate(req.params.id, req.body.campground, function(err, updateCampgrund){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//destroy campground
router.delete("/campgrounds/:id", middleware.checkCampgroundOwner, function(req, res){
    Campground.findById({_id: req.params.id}, function(err,campground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            campground.remove();
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;