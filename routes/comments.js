var express       = require("express");
var router        = express.Router();
var Campground    = require("../models/campground");
var Comment       = require("../models/comment");
var middleware = require("../middleware");
//==========
//Comments Routes
//==========

//new comment
router.get("/campgrounds/:id/comments/new", middleware.isLoggeedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else{
           res.render("comments/new", {campground: campground});
       }
    });
});


router.post("/campgrounds/:id/comments/", middleware.isLoggeedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//comment edit route
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwner, function(req,res){
    Campground.findById(req.params.id, function(err, foundcampground) {
        if(err || !foundcampground){
            req.flash("error", "Campground not found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {   
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
        });
    });
});
//update comment
router.put("/campgrounds/:id/comments/:comment_id/", middleware.checkCommentOwner, function(req, res){
    Comment.findOneAndUpdate(req.params.comment_id, req.body.comment, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//destory comment
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwner, function(req, res){
    Comment.findOneAndDelete({_id : req.params.comment_id}, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;