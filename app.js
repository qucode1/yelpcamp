var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Camp            = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds"),
    ensureLoggedIn  = require("connect-ensure-login").ensureLoggedIn;

var indexRoutes      = require("./routes/index"),
    campgroundRoutes = require("./routes/campground"),
    commentRoutes    = require("./routes/comments");

mongoose.connect("mongodb://localhost/yelpcamp");
app.set("view engine", "ejs");

app.use(flash());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Passport Config
app.use(require("express-session")({
    secret           : "Once again Rusty wins cutest dog",
    resave           : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Adding Seed Camps and Comments for testing
// seedDB();

// Use Middleware instead of manually passing currentUser in every Route!
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



// =================
// Routes
// =================

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server is live!")
})