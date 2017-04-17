var express = require("express");
var router  = express.Router({mergeParams: true}); //mergeParams to access :id from app.js
var Camp    = require("../models/campground");
var Comment = require("../models/comment");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
var middleware = require("../middleware");

// =================
// Comment Routes
// =================
//New
router.get("/new", middleware.isLoggedIn, function(req, res){
    Camp.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err.message)
        } else{
            res.render("comments/new", {campground: camp});
        }
    })
});
//Create
router.post("/", middleware.isLoggedIn, function(req, res){
    Camp.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err.message)
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err.message)
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect("/campgrounds/" + camp._id);
                }
            })
        }
    })
});
//Edit
router.get("/:commentId/edit", middleware.isCommentOwner, function(req, res) {
    Camp.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err.message);
            res.redirect("back")
        } else {
            Comment.findById(req.params.commentId, function(err, comment){
                if(err){
                    console.log(err.message);
                    res.redirect("back")
                } else {
                    res.render("comments/edit", {campground: camp, comment: comment})
                }
            })
        }
    })
});
//Update
router.put("/:commentId", middleware.isCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, camp){
        if(err){
            console.log(err.message);
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});
//Destroy
router.delete("/:commentId", middleware.isCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            console.log(err.message);
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});

module.exports = router;

