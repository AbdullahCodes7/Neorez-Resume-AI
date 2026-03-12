const express = require('express');
const router = express.Router();
const coverLetterController = require('../controllers/CoverLetter');


//Get the req.body and send it to open ai
router.post('/generateCoverLetter', coverLetterController.generateCoverLetter);
router.post('/generateCoverLetterBody', coverLetterController.generateCoverLetterBody);
router.post('/reGenerateCoverLetterBody', coverLetterController.ReGenerateCoverLetterBody);
router.post('/generateCoverLetterExtension', coverLetterController.generateCoverLetterExtension);
router.post('/generateCoverLetterExtensionDescription', coverLetterController.generateCoverLetterExtensionDescription);
router.get('/getPrompt/:id', coverLetterController.getPromptById);
router.post('/update-prompt/:id', coverLetterController.updatePromptInDatabase);
router.post("/pdfCoverLetterWithExtensionDescription", coverLetterController.pdfCoverLetterWithExtensionDescription)

// Create a new cover letter
router.post('/save', coverLetterController.createOrUpdateCoverLetter);

// Get all cover letters
router.get('/:id', coverLetterController.getAllCoverLetters);

// Get a single cover letter by ID
router.get('/draft/:uid', coverLetterController.getCoverLetterById);

// Update a cover letter by ID
router.put('/:id', coverLetterController.updateCoverLetter);

// Delete a cover letter by ID
router.delete('/delete/:id', coverLetterController.deleteCoverLetter);

module.exports = router;
