const AWS = require("aws-sdk");
const { deleteVideoFromS3, uploadVideoToS3 } = require("../../utils/AWS");
const videoModel = require("../../models/adminFeatures/videoModel");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});


const handleVideoUpload = async (req, res) => {
    const filename = req.body.filename;  // This is the filename sent in the request, e.g., "SampleVideo_1280x720_1mb.mp4"
    const objectName = `videos/${filename}`
    // try {
    //     // Check if the file exists and delete it before uploading
    //     try {
    //         await deleteVideoFromS3(objectName);
    //     } catch (err) {
    //         if (err.name !== "NotFound") {
    //             throw new Error(`Error checking file: ${err.message}`);
    //         }
    //     }

    //     console.log(req.body)
    //     const filePath = req.body.video;


    //     const mimeType = filePath.match(/data:(.*?);base64,/)[1];
    //     const base64ImageData = filePath.replace(/^data:.*;base64,/, '');
    //     const buffer = Buffer.from(base64ImageData, 'base64');
    //     // const fileName = `${section.name}.${mimeType.split('/')[1]}`;


    //     // console.log("mimeType", mimeType)
    //     // console.log("base64ImageData", base64ImageData)
    //     // console.log("buffer", buffer)
    //     // console.log("fileName", fileName)



    //     const result = await uploadVideoToS3(filePath, objectName);
    //     // console.log("result============================", result)


    //     // Save the video URL to MongoDB
    //     const newVideo = new videoModel({
    //         filename: req.body.filename,
    //         url: result.file_url,
    //     });

    //     await newVideo.save();



    //     res.json({ message: "File uploaded successfully", videoUrl: result.file_url });
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ error: "Failed to upload video", details: err.message });
    // }

    try {
        // Always delete the previous video from MongoDB and S3
        await videoModel.deleteOne({ filename });  // Remove previous video from MongoDB
        try {
            await deleteVideoFromS3(objectName);
        } catch (err) {
            if (err.name !== "NotFound") {
                throw new Error(`Error checking file: ${err.message}`);
            }
        }

        // Extract base64 video data
        const filePath = req.body.video;
        const mimeType = filePath.match(/data:(.*?);base64,/)[1];
        const base64ImageData = filePath.replace(/^data:.*;base64,/, '');
        const buffer = Buffer.from(base64ImageData, 'base64');
        console.log("mimeType", mimeType)
        // Upload the new video to S3
        const result = await uploadVideoToS3(filePath, objectName);

        // Save the new video URL to MongoDB
        const newVideo = new videoModel({
            filename: filename,
            url: result.file_url,
        });

        await newVideo.save();

        // Respond with success and video URL
        res.json({ message: "File uploaded successfully", videoUrl: result.file_url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to upload video", details: err.message });
    }
};



const getVideoFromDB = async (req, res) => {
    try {

        const video = await videoModel.findOne().sort({ createdAt: -1 })

        if (!video) {
            return res.status(404).json({ error: 'No video found' });
        }
        res.json({ message: 'Video fetched successfully', videoUrl: video.url });


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch video URL', details: err.message });
    }
};


module.exports = {
    handleVideoUpload,
    getVideoFromDB
}