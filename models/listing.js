const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },    
    description: String,
    image: {
        url: {
            type: String,
            default: "https://www.stockvault.net/data/2020/01/18/272608/thumb16.jpg",
            set: (v) => v === "" ? "https://www.stockvault.net/data/2020/01/18/272608/thumb16.jpg" : v,
        } 
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
    
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
