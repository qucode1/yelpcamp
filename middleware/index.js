var Comment = require("../models/comment"),
    Camp    = require("../models/campground");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You have to be logged in for that");
    res.redirect("/login");
}

middlewareObj.isCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentId, function(err, foundComment){
            if(err){
                console.log(err.message);
                res.redirect("back")
            } else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You are not the author");
                    res.redirect("back")
                }
            }
        })
    } else {
        req.flash("error", "You have to be logged in for that");
        res.redirect("back");
    }
};

middlewareObj.isCampgroundOwner = function(req, res, next){
    if(req.isAuthenticated()){
    Camp.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err.message);
            res.redirect("back")
        } else{
            if(foundCamp.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You are not the author");
                res.redirect("/campgrounds")
            }
        }
    })
    } else {
        req.flash("error", "You have to be logged in for that");
        res.redirect("back")
    }
    
};

module.exports = middlewareObj;