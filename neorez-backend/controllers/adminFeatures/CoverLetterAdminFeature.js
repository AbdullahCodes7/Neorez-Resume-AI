const AWS = require('aws-sdk');
const { uploadFileToAWS } = require('../../utils/AWS');
const CoverLetterBuilder = require('../../models/adminFeatures/CoverLetterAdminFeature');

const s3 = new AWS.S3();



// Get all resumes
exports.getCoverLetterById = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters

        if (!id) {
            return res.status(400).json({ error: "Resume ID is required." });
        }

        const resume = await CoverLetterBuilder.findById(id); // Find the document by _id

        if (!resume) {
            return res.status(404).json({ error: "Resume not found." });
        }

        res.status(200).json(resume); // Return the resume document
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({ error: error.message });
    }
};


// Update a resume
exports.updateCoverLetter = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedResume = await CoverLetterBuilder.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedResume) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.status(200).json(updatedResume);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Upload video to AWS S3
// exports.uploadVideo = async (req, res) => {
//     try {
//         const { file } = req;
//         const params = {
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: `videos/${file.originalname}`,
//             Body: file.buffer,
//             ContentType: file.mimetype,
//         };

//         s3.upload(params, (err, data) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             res.status(200).json({ message: 'Video uploaded successfully', data });
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
// // Create a new resume with video upload
// Create or Update Resume with Video
exports.createOrUpdateCoverLEtterWithImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, heading, body, features, imageBase64, imageName, imageMimeType } = req.body;

        // console.log("Update Request:", req.body);

        if (!id) {
            throw new Error("Resume ID is required.");
        }
        let imageUrl
        // Handle image update only if imageBase64 is provided
        if (imageBase64) {
            // Validate base64 format
            if (!imageBase64.startsWith('data:')) {
                throw new Error("Invalid image data format");
            }

            const mimeType = imageBase64.match(/data:(.*?);base64,/)[1];
            const base64ImageData = imageBase64.replace(/^data:.*;base64,/, '');
            const buffer = Buffer.from(base64ImageData, 'base64');
            const fileName = `${imageName}.${mimeType.split('/')[1]}`;

            // Upload the image
            const uploadResult = await uploadFileToAWS(buffer, fileName, "image", mimeType);
            if (!uploadResult.success) {
                throw new Error('Failed to upload image');
            }
            imageUrl = uploadResult.file_url; // Store the uploaded image URL
        }
        // Check if a resume ID is provided (i.e., for updating)
        if (id) {
            // If resume exists, update it with the new image URL and other fields
            const updatedResume = await CoverLetterBuilder.findByIdAndUpdate(
                id,
                {
                    userId: userId,
                    heading,
                    body,
                    features,
                    ...(imageUrl && { image: imageUrl }), // Update image only if a new one is provided
                },
                { new: true } // This will return the updated document
            );

            if (updatedResume) {
                return res.status(200).json(updatedResume); // Successfully updated
            }
        } else {
            // If no resumeId provided, create a new resume
            const newCoverLetter = new CoverLetterBuilder({
                userId: userId,
                heading,
                body,
                features,
                image: imageUrl || "", // Use uploaded image URL if available
            });

            await newCoverLetter.save(); // Save the new resume in the database
            return res.status(201).json(newCoverLetter); // Return the created resume
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error: error.message });
    }
};