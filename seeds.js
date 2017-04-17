var mongoose = require("mongoose");
var Camp     = require("./models/campground");
var Comment  = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://source.unsplash.com/NUrGaaMh6gE",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. "
    },
    {
        name: "Desert Mesa",
        image: "https://source.unsplash.com/B9z9TjfIw3I",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. "
    },
    {
        name: "Canyon Floor",
        image: "https://source.unsplash.com/K9olx8OF36A",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. "
    }];

function seedDB() {
    Camp.remove({}, function(err) {
        if(err){
            console.log(err);
        } else {
            Comment.remove({}, function(err) {
                if(err){
                    console.log(err)
                } else {
                    console.log("removed campgrounds and comments");
                    data.forEach(function(seed) {
                        Camp.create(seed, function(err, camp) {
                            if(err){
                                console.log(err)
                            } else {
                                console.log("added campground");
                                Comment.create({text: "This place is great, but I wish there was internet", author: "Homer"}, function(err, comment) {
                                    if(err){
                                        console.log(err)
                                    } else {
                                        camp.comments.push(comment);
                                        camp.save();
                                        console.log("Created comment")
                                    }
                                })
                            }
                        });
                    });                    
                }
            })
        }
    });
    
};

module.exports = seedDB;