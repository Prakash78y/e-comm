const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const reviewSchema = new mongoose.Schema({
    
     
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    },
    comment:{
        type:String,
        trim:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'

    },

});

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;