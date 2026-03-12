const jobApplicationSchema = require("../models/jobApplicationSchema");

exports.saveJobApplications = async (req, res) => {
    const { applicationDate, applyMethod, companyName, description, jobTitle, jobUrl, location, userId } = req.body;

    // console.log("req.body", req.body)
    const newJobApplication = new jobApplicationSchema({
        applicationDate,
        applyMethod,
        companyName,
        description,
        jobTitle,
        jobUrl,
        location,
        userId,  // Store the user's ID
    });

    // console.log("newJobApplication", newJobApplication)

    try {
        const savedJobApplication = await newJobApplication.save();
        res.status(201).json(savedJobApplication);
    } catch (error) {
        console.log(error)

        res.status(500).json({ error: 'Failed to add job application' });
    }
};
exports.getJobApplications = async (req, res) => {
    try {
        const userId = req.params.id
        // console.log(userId)
        const jobApplications = await jobApplicationSchema.find({ userId });
        // console.log("get jobApplications", jobApplications)
        res.json(jobApplications);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to retrieve job applications' });
    }
};


exports.deleteJobApplications = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await jobApplicationSchema.findOne({ _id: jobId });

        // console.log(job)
        if (!job) {
            return res.status(404).json({ error: 'Job application not found' });
        }

        await jobApplicationSchema.findByIdAndDelete(jobId);
        res.status(204).send();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to delete job application' });
    }
};


