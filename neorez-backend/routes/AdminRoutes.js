const express = require('express');
const router = express.Router();
const { createOrUpdateResumeWithImage, getResumeById } = require('../controllers/adminFeatures/ResumeAdminFeature');
const { createOrUpdateCoverLEtterWithImage } = require('../controllers/adminFeatures/CoverLetterAdminFeature');
const { getCoverLetterById } = require('../controllers/CoverLetter');
const { handleVideoUpload, getVideoFromDB } = require('../controllers/adminFeatures/VideoController');


//resume feature section in the admin side
router.post('/update-resume-feature/:id', createOrUpdateResumeWithImage);
router.get('/get-Resume-feature/:id', getResumeById);

//cover letter section in the admin side
router.post('/update-cover-letter-feature/:id', createOrUpdateCoverLEtterWithImage);

router.get('/get-cover-letter-feature/:id', getCoverLetterById);

//video upload route
router.post('/upload-video', handleVideoUpload);

// get video

router.get("/get-video", getVideoFromDB)

module.exports = router;
