const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplication');

// Route to save a new job application
router.post('/add-jobs', jobApplicationController.saveJobApplications);

// Route to get all job applications for a specific user
router.get('/get-jobs/:id', jobApplicationController.getJobApplications);

// Route to delete a job application by ID for a specific user
router.delete('/delete-job/:id', jobApplicationController.deleteJobApplications);

module.exports = router;
