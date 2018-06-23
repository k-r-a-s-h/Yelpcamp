var mongoose=require("mongoose");
var Campground=require("./models/campground");
var data=[
    {name:"Cloud's Rest",image:"https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae hendrerit leo, in tincidunt elit. Curabitur placerat dapibus nisi, at feugiat ex. Donec tincidunt eleifend porta. Fusce sit amet ipsum ut elit iaculis mattis eget eu dolor. Donec vel odio dapibus, viverra erat eget, tempor leo. Curabitur nec lectus quis dui dictum porta. Mauris imperdiet lobortis tincidunt. Aliquam pellentesque ultricies diam sit amet finibus. Aliquam vulputate egestas venenatis. Suspendisse rutrum vestibulum augue in lobortis.Vestibulum a justo eleifend, dignissim mauris a, vulputate odio. Proin lacinia nec massa nec feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius natoque."},
    {name:"Heaven's Den",image:"https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae hendrerit leo, in tincidunt elit. Curabitur placerat dapibus nisi, at feugiat ex. Donec tincidunt eleifend porta. Fusce sit amet ipsum ut elit iaculis mattis eget eu dolor. Donec vel odio dapibus, viverra erat eget, tempor leo. Curabitur nec lectus quis dui dictum porta. Mauris imperdiet lobortis tincidunt. Aliquam pellentesque ultricies diam sit amet finibus. Aliquam vulputate egestas venenatis. Suspendisse rutrum vestibulum augue in lobortis.Vestibulum a justo eleifend, dignissim mauris a, vulputate odio. Proin lacinia nec massa nec feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius natoque."},
    {name:"Camp Exotica",image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae hendrerit leo, in tincidunt elit. Curabitur placerat dapibus nisi, at feugiat ex. Donec tincidunt eleifend porta. Fusce sit amet ipsum ut elit iaculis mattis eget eu dolor. Donec vel odio dapibus, viverra erat eget, tempor leo. Curabitur nec lectus quis dui dictum porta. Mauris imperdiet lobortis tincidunt. Aliquam pellentesque ultricies diam sit amet finibus. Aliquam vulputate egestas venenatis. Suspendisse rutrum vestibulum augue in lobortis.Vestibulum a justo eleifend, dignissim mauris a, vulputate odio. Proin lacinia nec massa nec feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius natoque."}
    ];
var Comment=require("./models/comment");

function seedDB() {
    // Remove all Campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed Campgrounds");
            // Add Campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added a Campground");
                        // Create a Comment
                        Comment.create(
                            {
                                text: "This place is great",
                                author: "Dave"
                            }, function(err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        }
    });
}
module.exports=seedDB;
