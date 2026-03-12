const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/UserResume');
const resumeFeatures = require('../controllers/functionalities/ResumeFeatures');

const { handleUserInput, updatePrompt, getPrompts } = require('../controllers/functionalities/resumeCreationAi');

router.post('/create', resumeController.createOrUpdateResume);
router.post('/draft', resumeController.createOrUpdateResume);
router.get('/draft/:uid', resumeController.fetchResumes);
// router.get('/getAllResumes/:uid', resumeController.fetchAllResumes);
router.post("/generateSummary", resumeFeatures.generateSummary)
router.post("/generateAiResume", resumeFeatures.generateAiResume)
router.post("/generateSkills", resumeFeatures.generateSkills)
router.post("/generateJobDescription", resumeFeatures.generateJobResponsibilities)
router.get("/jobs", resumeFeatures.getjobsIndeed)
router.post("/generateResume", resumeFeatures.generateResumeOnJobDescription)

router.post("/generateCustomTitle", resumeFeatures.generateCustomTitle)
router.post("/generateStrengths", resumeFeatures.generateStrengths)
router.post("/generateProjectDescription", resumeFeatures.generateProjects)
router.post("/generateTrainingCourseDescription", resumeFeatures.generateTrainingCourses)

router.post("/generateResumeScore", resumeFeatures.generateResumeScore)
router.post("/generateResumeScoreExtension", resumeFeatures.generateResumeScoreFromExtension)
router.post("/generateResumeReview", resumeFeatures.generateResumeReview)
router.post("/pdfResume", resumeFeatures.pdfResume)
router.post("/pdfResumeWithExtensionDescription", resumeFeatures.pdfResumeWithExtensionDescription)


//saved resume uid based create new resuem with the job description

router.post('/savedResumeWithExtensionDescription', resumeFeatures.savedResumeWithExtensionDescription);

// router.post("/fixNewResume", resumeFeatures.fixNewResume)
// router.post("/create-checkout-session", resumeFeatures.createCheckoutSession)
// router.post("/get-session-info", resumeFeatures.getSessionInfo)
router.post('/ai-create', handleUserInput);
router.post('/update-prompt/:id', updatePrompt);
router.get('/get-all', getPrompts);
router.get('/resumes/:id', resumeController.getAllResumes);
router.get('/resumes/:id', resumeController.getResumeById);
router.put('/resumes/:id', resumeController.updateResume);
router.delete('/delete/:id', resumeController.deleteResume);

module.exports = router;
