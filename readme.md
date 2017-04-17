#Main Changes: 
(v11 changes)
===============================
#Flash Messages:
install and configure connect-flash
add boostrap alerts to header
===============================

#Installation and Config:
app.js: 

var flash           = require("connect-flash");
app.use(flash());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

#Example of usage in index.js:

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome " + user.username);
            res.redirect("/campgrounds");
        })
    })
});

#Bootstrap classes in header.ejs: 

<div class="container">
    <% if(error && error.length > 0){ %>
    <div class="alert alert-danger" role="alert"> <%= error %></div>
    <% } %>
    <% if(success && success.length > 0){ %>
    <div class="alert alert-success" role="alert"> <%= success %></div>
    <% } %>
</div>