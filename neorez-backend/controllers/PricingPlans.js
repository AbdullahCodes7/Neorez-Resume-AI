// controllers/pricingPlansController.js

const PricingPlans = require('../models/pricingPlans');
const User = require('../models/User');

async function addPricingPlan(req, res) {
    try {
        const userRole = req.body.role;

        // Check if the user is an admin
        if (userRole !== 'Admin') {
            return res.status(403).send('Only admins can add pricing plans.');
        }

        const { planTitle, price, duration } = req.body;

        // Create a new PricingPlan instance
        const newPricingPlan = new PricingPlans({
            planTitle,
            price,
            duration,
            // description
        });

        // Save the new pricing plan to the database
        const savedPricingPlan = await newPricingPlan.save();

        res.status(201).send({ message: "Plan Added Successfully", success: true, savedPricingPlan });
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
}


async function updatePricingPlan(req, res) {
    try {

        // console.log('Request Params:', req.params);
        // console.log('Request Body:', req.body);

        const userRole = req.body.role;

        // Check if the user is an admin
        if (userRole !== 'Admin') {
            return res.status(403).send('Only admins can update pricing plans.');
        }

        const { id } = req.params;
        const { planTitle, price, duration } = req.body;

        // console.log('ID:', id);
        // console.log('Update Data:', { planTitle, price, duration });

        // Attempt to find and update the pricing plan
        const updatedPricingPlan = await PricingPlans.findByIdAndUpdate(id, {
            planTitle,
            price,
            duration,
            // description,
            updatedAt: Date.now()
        });

        // console.log('Updated Pricing Plan:', updatedPricingPlan);

        if (!updatedPricingPlan) {
            return res.status(404).send('Pricing plan not found.');
        }

        res.send({ message: "Price Updated Successfully", success: true, updatedPricingPlan });
    } catch (error) {
        console.error('Error updating pricing plan:', error.message);
        res.status(400).send(error.message);
    }
}


//get all pricing plans

const getAllPricingPlans = async (req, res) => {
    try {
        const getAllPricingPlans = await PricingPlans.find();
        // console.log(getAllPricingPlans);
        res.send(getAllPricingPlans);

    } catch (error) {
        console.error('Error fetching pricing plans:', error.message);
        res.status(500).send({ message: error.message });
    }
}
// Add this method to the same controller file

async function getAllUsers(req, res) {
    const userRole = req.params.role;
    // console.log(userRole);


    // Check if the user is an admin
    if (userRole !== 'Admin') {
        return res.status(403).send('Only admins can see all users.');
    }
    try {
        const getAllUsers = await User.find();
        // console.log(getAllUsers);

        res.status(200).send(getAllUsers);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

// Add this method to the same controller file

// async function deleteUser(req, res) {
//     try {

//         const userRole = req.body.role;

//         // Check if the user is an admin
//         if (userRole !== 'admin') {
//             return res.status(403).send('Only admins can delete users.');
//         }

//         const { id } = req.params;

//         const deleteUser = await User.findByIdAndDelete(id);

//         if (!deleteUser) {
//             return res.status(404).send('User not Exists.');
//         }

//         res.send({ message: 'User Removed successfully.' });
//     } catch (error) {
//         res.status(404).send({ message: error.message, success: false });
//     }
// };

async function deleteUser(req, res) {
    try {
        const userRole = req.body.role;
        // console.log(req.body)
        // console.log(userRole)
        // console.log(req.params)

        if (userRole !== 'Admin') {
            return res.status(403).send({ message: 'Only admins can delete users.' });
        }

        const { id } = req.params;

        // Fetch the user that is about to be deleted to check their role
        const userToDelete = await User.findById(id);

        // console.log("userToDelete", userToDelete)
        if (!userToDelete) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Check if the user to be deleted is an admin
        if (userToDelete.role === 'Admin') {
            return res.status(403).send({ message: 'You cannot delete another admin user.' });
        }

        // Proceed with deleting the user if they are not an admin
        await User.findByIdAndDelete(id);

        res.send({ message: 'User removed successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message, success: false });
    }
}


module.exports = {
    addPricingPlan,
    updatePricingPlan,
    getAllUsers,
    deleteUser,
    getAllPricingPlans
}