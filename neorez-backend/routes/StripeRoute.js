const express = require("express");
const { getCheckoutSession } = require("../controllers/Stripe");
const router = express.Router();

// Route to fetch the Checkout Session from Stripe
router.get("/checkout-session/:checkoutid", getCheckoutSession);

// Export the router using CommonJS syntax
module.exports = router;
