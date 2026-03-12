const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  email: { type: String, required: true },
  planType: { type: String, required: true },
  plan: { type: String, required: true }, // Weekly, Monthly, Annual
  amount: { type: Number, required: true },
  sessionId: { type: String, required: true }, // Stripe checkout session ID
  status: { type: String, required: true }, // 'paid', 'pending', etc.
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);

// Function to save payment data to the database
const savePaymentData = async (data) => {
  try {
    const payment = new Payment(data);
    await payment.save();
  } catch (error) {
    console.error("Error saving payment data:", error);
  }
};

module.exports = { savePaymentData };
