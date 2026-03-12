const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { savePaymentData } = require("../models/PaymentModel"); // Import database model
const PricingPlans = require("../models/pricingPlans");
const User = require("../models/User");

const getCheckoutSession = async (req, res) => {
  const { checkoutid } = req.params;

  try {
    const session = await stripe.checkout.sessions.retrieve(checkoutid);
    const response = await PricingPlans.findOne({
      subscription_id: session.payment_link,
    });

    if (!response) {
      return res.status(404).json({ error: "Pricing plan not found" });
    }
    const user = await User.findOne({ email: session.customer_details.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.subscriptionStatus = response.planTitle;
    user.avail_free_trial = true;
    user.subscription.push({
      month: response.duration,
      amount: response.price,
    });
    const result = await user.save();

    if (!result) {
      return res
        .status(500)
        .json({ error: "Failed to update user subscription" });
    }

    return res.json({ success: true, message: "Plan subscribed Succesfully!" });
  } catch (error) {
    console.error("Error fetching session data:", error);
    res.status(500).send("Error fetching session data.");
  }
};

module.exports = { getCheckoutSession };
