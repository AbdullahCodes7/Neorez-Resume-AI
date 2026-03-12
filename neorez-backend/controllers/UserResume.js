const ResumeModel = require('../models/UserResume');
const resumeGeneration = require("./functionalities/OpenAi");
// Create a new resume
const mongoose = require('mongoose');
const { uploadFileToAWS } = require('../utils/AWS');

// exports.createResume = async (req, res) => {
//     try {
//         // console.log(req.body);

//         // Validate userId
//         if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
//             return res.status(400).json({ error: 'Invalid or missing userId.' });
//         }

//         // Check if a file is attached
//         if (!req.body) {
//             return res.status(400).json({
//                 message: 'Passport image is required.',
//                 error: true,
//                 success: false
//             });
//         }
//         // console.log(req.body.profile.profileImage);
//         const image = req.body.profile.profileImage
//         // const { buffer, originalname, mimetype } = req.body.profile.profileImage;
//         if (!image || !image.startsWith('data:')) {
//             return res.status(400).json({ message: "Invalid image data format", success: false });
//         }

//         // Extract MIME type and base64 data
//         const mimeType = image.match(/data:(.*?);base64,/)[1];
//         const base64ImageData = image.replace(/^data:.*;base64,/, '');


//         const buffer = Buffer.from(base64ImageData, 'base64');

//         const fileName = `${req.body.profile.name}.${mimeType.split('/')[1]}`;

//         // Upload the image to AWS
//         const uploadResult = await uploadFileToAWS(buffer, fileName, "image", mimeType);
//         if (!uploadResult.success) {
//             return res.status(500).json({
//                 message: 'Failed to upload image',
//                 error: true,
//                 success: false
//             });
//         }

//         const imageUrl = uploadResult.file_url;
//         // console.log(imageUrl);
//         // Prepare resume data
//         const resumeData = {
//             ...req.body,
//             image: imageUrl
//         };

//         // console.log(resumeData);


//         // Create and save new resume
//         const newResume = new ResumeModel(resumeData);
//         await newResume.save();

//         return res.status(201).json({
//             message: 'Resume created successfully.',
//             data: newResume,
//             success: true
//         });

//     } catch (error) {
//         console.error('Error creating resume:', error);
//         return res.status(500).json({
//             message: 'Server error. Please try again later.',
//             error: true,
//             success: false
//         });
//     }
// };




const deepEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

exports.createOrUpdateResume = async (req, res) => {
    try {
        const { userId, templateId, sections, uid, design, resumeName } = req.body;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid or missing userId.' });
        }

        if (!uid) {
            return res.status(400).json({ error: 'Missing or invalid uid.' });
        }

        // Fetch the existing resume based on `uid`
        let existingResume = await ResumeModel.findOne({ uid });

        // Check if resume exists; if not, create a new one
        if (!existingResume) {
            if (!sections || sections.length === 0) {
                return res.status(400).json({ message: 'Sections are required to create a resume.' });
            }

            // Process sections (including profile image processing if necessary)
            const processedSections = await Promise.all(
                sections.map(async (section) => {
                    if (section?.type === "profile" && section?.profileImage && section?.profileImage !== "") {
                        const image = section.profileImage;

                        // Validate base64 format
                        if (!image.startsWith('data:')) {
                            throw new Error("Invalid image data format");
                        }

                        const mimeType = image.match(/data:(.*?);base64,/)[1];
                        const base64ImageData = image.replace(/^data:.*;base64,/, '');
                        const buffer = Buffer.from(base64ImageData, 'base64');
                        const fileName = `${section.name}.${mimeType.split('/')[1]}`;

                        // Upload the image
                        const uploadResult = await uploadFileToAWS(buffer, fileName, "image", mimeType);
                        if (!uploadResult.success) {
                            throw new Error('Failed to upload image');
                        }

                        // Set the uploaded image URL in the section
                        section.profileImage = uploadResult.file_url;
                    }
                    return section;
                })
            );

            // Create a new resume with the provided data
            const resumeData = {
                userId,
                uid,
                templateId,
                sections: processedSections,
                design: design || {},
                resumeName: resumeName
            };

            const newResume = new ResumeModel(resumeData);
            await newResume.save();

            return res.status(201).json({
                message: 'Resume created successfully.',
                data: processedSections,
                success: true
            });
        } else {
            // Track changes
            let sectionsUpdated = false;
            let processedSections = existingResume.sections;

            // Compare and process sections if they are provided in the request
            if (sections && !deepEqual(sections, existingResume.sections)) {
                sectionsUpdated = true;

                processedSections = await Promise.all(
                    sections.map(async (section) => {
                        if (section.type === "profile" && section.profileImage && section.profileImage !== "") {
                            const image = section.profileImage;

                            // Validate base64 format
                            if (!image.startsWith('data:')) {
                                throw new Error("Invalid image data format");
                            }

                            const mimeType = image.match(/data:(.*?);base64,/)[1];
                            const base64ImageData = image.replace(/^data:.*;base64,/, '');
                            const buffer = Buffer.from(base64ImageData, 'base64');
                            const fileName = `${section.name}.${mimeType.split('/')[1]}`;

                            // Upload the image
                            const uploadResult = await uploadFileToAWS(buffer, fileName, "image", mimeType);
                            if (!uploadResult.success) {
                                throw new Error('Failed to upload image');
                            }

                            // Set the uploaded image URL in the section
                            section.profileImage = uploadResult.file_url;
                        }
                        return section;
                    })
                );
            }

            // Check if design or templateId have changed
            const designUpdated = design && !deepEqual(design, existingResume.design);
            const resumeNameUpdated = resumeName && !deepEqual(resumeName, existingResume.resumeName);
            const templateIdUpdated = templateId && templateId !== existingResume.templateId;

            // Update fields only if they have changed
            if (sectionsUpdated) {
                existingResume.sections = processedSections;
            }
            if (templateIdUpdated) {
                existingResume.templateId = templateId;
            }
            if (designUpdated) {
                existingResume.design = design;
            }
            if (resumeNameUpdated) {
                existingResume.resumeName = resumeName;
            }

            // Save only if any update has occurred
            if (sectionsUpdated || designUpdated || templateIdUpdated) {
                await existingResume.save();
            }

            return res.status(200).json({
                message: sectionsUpdated || designUpdated || templateIdUpdated ? 'Resume updated successfully.' : 'No changes detected.',
                data: existingResume,
                success: true
            });
        }
    } catch (error) {
        console.error('Error processing resume:', error);
        return res.status(500).json({
            message: 'Server error. Please try again later.',
            error: error.message,
            success: false
        });
    }
};



//create through Ai
// exports.generateAiResume = async (req, res) => {
//     const data = req.body;
//     console.log("body Data", data);
//     let prompt = `${JSON.stringify(data.title)} Generate a detailed CV for ${data.userName}, who is a ${data.jobTitle}. Include sections such as professional summary, key skills, work experience, education, certifications, and any other relevant information that showcases ${data.userName} 's qualifications and achievements in the ${data.jobTitle} field.`;
//     console.log(prompt);


//     try {
//         const generatedResume = await resumeGeneration.generateChat(prompt);
//         const stringResume = generatedResume.split("undefined")[0];
//         console.log(stringResume);
//         // console.log(JSON.parse(stringResume));
//         res.json({ aiResume: stringResume });
//     } catch (e) {
//         console.log(e.message);
//         res.json({ "message": e.message });
//     }

// }
// Get all resumes
exports.getAllResumes = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming id is the userId from the route params
        // console.log("User ID:", userId);

        // Find all resumes that belong to the user
        const resumes = await ResumeModel.find({ userId }); // Query by userId, not findById

        if (!resumes || resumes.length === 0) {
            return res.status(404).json({ message: "No resumes found for this user." });
        }

        // console.log("Resumes found:", resumes);
        res.status(200).json(resumes);
    } catch (error) {
        console.error("Error fetching resumes:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.fetchResumes = async (req, res) => {
    const { uid } = req.params;

    try {
        const resume = await ResumeModel.findOne({ uid });
        // console.log(resume)
        if (resume) {
            res.status(200).json(resume);
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({ error: error.message });
    }
};


// Get a single resume by ID
exports.getResumeById = async (req, res) => {
    try {
        const resume = await ResumeModel.findOne(req.params.userId)
        if (!resume) return res.status(404).json({ error: 'Resume not found' });
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a resume by ID
exports.updateResume = async (req, res) => {
    try {
        const resumeId = req.params.id;
        const updateData = req.body;
        const updatedResume = await ResumeModel.findByIdAndUpdate(resumeId, updateData)
        if (!updatedResume) return res.status(404).json({ error: 'Resume not found' });
        res.status(200).json(updatedResume);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a resume by ID
exports.deleteResume = async (req, res) => {
    try {
        const resumeId = req.params.id;
        // console.log("resumeId", resumeId)
        const deletedResume = await ResumeModel.findOneAndDelete({ uid: resumeId })
        // console.log(deletedResume)
        if (!deletedResume) return res.status(404).json({ error: 'Resume not found' });
        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};