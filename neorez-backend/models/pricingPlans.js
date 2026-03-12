const mongoose = require("mongoose");

const PricingSchema = new mongoose.Schema({
    planTitle: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        // required: true,
    },
    duration: {
        type: String,
        // required: true,
    },
    subscription_id: {
        type: String,
        // required: true,
    },
    description: {
        type: [String],
        // required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const PricingPlans = mongoose.model("PricingPlans", PricingSchema);
module.exports = PricingPlans