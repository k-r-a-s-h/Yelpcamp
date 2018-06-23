var mongoose=require("mongoose");
//Schema system
var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    author:{
      id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
      },
      username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
        ]
},{ 
    usePushEach: true 
});
module.exports=mongoose.model("Campground",campgroundSchema);