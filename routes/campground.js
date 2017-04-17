var express        = require("express");
var router         = express.Router();
var Camp           = require("../models/campground");
var ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;
var middleware     = require("../middleware");

// =================
// Campground Routes
// =================

//INDEX - Show all campgrounds
router.get("/", function(req, res){
    Camp.find({}, function(err, camps) {
        if(err){
            console.log("Oh no, error!" + err);
        } else {
            res.render("camps/index", {campgrounds: camps});
        }
    });
});

//CREATE - Adds new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var newCamp = {
        name:        req.body.newCampName, 
        image:       req.body.newCampImage, 
        description: req.body.newCampDescription,
        author:      {
            id: req.user._id,
            username: req.user.username
        }
    };
    Camp.create(newCamp, function(err, camp){
        if(err){
            console.log("Error: " + err);
            req.flash("error", err.message);
            req.redirect("/campgrounds");
        } else {
            req.flash("success", "New Camp created");
            res.redirect("/campgrounds");
        }
    });
});

//NEW - Show form to make new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("camps/new");
});

//SHOW - Shows more information on specific campground
router.get("/:id", function(req, res){
    Camp.findById(req.params.id).populate("comments").exec(function(err, camp) {
        if(err){
            console.log("Oh no, error!" + err.message);
        } else {
            // console.log(camp);
            res.render("camps/show", {campground: camp});
        }
    });
});

//EDIT Campground Route
router.get("/:id/edit", middleware.isCampgroundOwner, function(req,res){
    Camp.findById(req.params.id, function(err, camp) {
        if(err){
            console.log(err)
        } else {
            res.render("camps/edit", {campground: camp})
        }
    })
})

//UPDATE Campground Route
router.put("/:id", middleware.isCampgroundOwner, function(req, res) {
    Camp.findByIdAndUpdate(req.params.id, req.body.campground, function(err, camp){
        if(err){
            console.log(err.message)
        } else {
            req.flash("success", "Camp edited");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//DELETE Campground Route
router.delete("/:id", middleware.isCampgroundOwner, function(req, res){
    Camp.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err.message);
            res.redirect("/campgrounds");
        }
    })
    req.flash("success", "Camp deleted");
    res.redirect("/campgrounds");
})
module.exports = router;
