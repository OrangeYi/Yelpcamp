var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"Cloud's Rest",
        image: "https://cdn-images-1.medium.com/max/2000/1*IUsXveNv4b8iflB-qVrCyA.jpeg",
        description: "14.5 miles roundtrip, very difficult. There’s multiple stretches of uphill climbs, one of which lasts for an entire mile of relentless switchbacks."
    },
    {
        name:"National Parl",
        image: "https://s3.amazonaws.com/imagescloud/images/medias/reservation/camping/main.jpg",
        description: "14.5 miles roundtrip, very difficult. There’s multiple stretches of uphill climbs, one of which lasts for an entire mile of relentless switchbacks."
    },
    {
        name:"Camping des 5 Vallées",
        image: "https://cdn.travelpulse.com/images/99999999-9999-9999-9999-999999999999/777BB633-D2CE-56A8-E06C-7C2F8E6CD135/630x355.jpeg",
        description: "14.5 miles roundtrip, very difficult. There’s multiple stretches of uphill climbs, one of which lasts for an entire mile of relentless switchbacks."
    }
];

function seedDB(){
    //remove all campgrounds
    Campground.deleteMany({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("remove campgrounds!");
        // //remove comment
        // Comment.deleteMany({},function(err){
        //     //create campground
        //     data.forEach(function(seed){
        //     Campground.create(seed,function(err,campground){
        //       if(err){
        //           console.log(err);
        //       }else{
        //             console.log("added a campground");
        //             //create comment
        //             Comment.create(
        //                 {
        //                   text: "This place is great",
        //                   author: "alex"
        //                 }, function(err, comment){
        //                     if(err){
        //                           console.log(err);
        //                     }else{
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Create new comment");
        //                     }
        //             });
        //       }
        //     });
        // });
        // });
    });
}
module.exports = seedDB;