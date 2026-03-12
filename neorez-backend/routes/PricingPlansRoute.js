// routes/pricingPlansRoutes.js

const express = require('express');
const { updatePricingPlan, getAllUsers, deleteUser, addPricingPlan, getAllPricingPlans } = require('../controllers/PricingPlans');
const router = express.Router();


router.post('/add', addPricingPlan);
router.put('/:id', updatePricingPlan);
router.get('/:role', getAllUsers);
router.get('/', getAllPricingPlans);
router.post('/:id', deleteUser);

module.exports = router;