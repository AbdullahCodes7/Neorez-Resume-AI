// const AWS = require("aws-sdk");

// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//     region: process.env.AWS_REGION,
// });

// const s3 = new AWS.S3();
// const bucketName = process.env.AWS_BUCKET_NAME;

// async function uploadFileToAWS(base64String, fileName, fileFolderPath, mimeType) {
//     try {
//         const key = `${fileFolderPath}/${Date.now()}_${fileName}`;

//         // Convert base64 string to buffer
//         const contentBody = Buffer.from(base64String, 'base64');

//         const uploadParams = {
//             Bucket: bucketName,
//             Key: key,
//             Body: contentBody,
//             ContentType: mimeType,
//         };

//         const uploadData = await s3.upload(uploadParams).promise();
//         return { success: true, file_url: uploadData.Location };
//     } catch (error) {
//         console.error("Upload Error:", error);
//         return { message: "Internal Server Error", error: error, success: false };
//     }
// }

// module.exports = { uploadFileToAWS }


const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3 } = require("./client");
const fs = require("fs");
const s3Client = new S3Client({

    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const bucketName = process.env.AWS_BUCKET_NAME;
async function uploadFileToAWS(base64String, fileName, fileFolderPath, mimeType) {
    try {
        const key = `${fileFolderPath}/${Date.now()}_${fileName}`;

        // Convert base64 string to buffer
        const contentBody = Buffer.from(base64String, 'base64');

        const uploadParams = {
            Bucket: bucketName,
            Key: key,
            Body: contentBody,
            ContentType: mimeType,
        };

        const command = new PutObjectCommand(uploadParams);
        const uploadData = await s3Client.send(command);
        console.log(uploadData);
        return {
            success: true,
            file_url: `https://${bucketName}.s3.amazonaws.com/${uploadParams.Key}`,
        }
        // return { success: true, file_url: uploadData.Location };
    } catch (error) {
        console.error("Upload Error:", error);
        return { message: "Internal Server Error", error: error, success: false };
    }
}

// async function deleteFileFromAWS(fileUrl) {
//     try {
//         // Ensure the URL is valid and extract the file key
//         const fileKey = fileUrl.split('.amazonaws.com/')[1];

//         if (!fileKey) {
//             throw new Error('Invalid file URL or missing file key');
//         }

//         // S3 delete command params
//         const deleteParams = {
//             Bucket: bucketName,
//             Key: fileKey,  // This is the extracted file key
//         };

//         // Create and send the delete command
//         const command = new DeleteObjectCommand(deleteParams);
//         await s3Client.send(command);

//         return { success: true, message: 'File deleted successfully' };
//     } catch (error) {
//         console.error('Error deleting file from S3:', error);
//         return { success: false, message: 'Failed to delete file', error };
//     }
// }

async function deleteFileFromAWS(fileUrl) {
    try {
        // Ensure the fileUrl is valid and extract the file key
        const url = new URL(fileUrl);  // Use URL object to easily parse the URL
        console.log(url)
        const fileKey = url.pathname.substring(1); // This extracts the file path (removes leading '/')

        if (!fileKey) {
            throw new Error('Invalid file URL or missing file key');
        }

        // S3 delete command params
        const deleteParams = {
            Bucket: bucketName,
            Key: fileKey,  // This is the extracted file key
        };

        // Create and send the delete command
        const command = new DeleteObjectCommand(deleteParams);
        await s3Client.send(command);

        return { success: true, message: 'File deleted successfully' };
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        return { success: false, message: 'Failed to delete file', error };
    }
}


async function uploadVideoToS3(base64String, objectName) {
    try {

        // Remove the "data:video/mp4;base64," prefix from the base64 string
        const base64Data = base64String.replace(/^data:video\/mp4;base64,/, '');

        // Convert the base64 string to a buffer
        const buffer = Buffer.from(base64Data, 'base64');

        // Set up the parameters for the upload
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: objectName,   // S3 object key (file name with path)
            Body: buffer,      // The video content (in buffer format)
            ContentType: 'video/mp4',  // Ensure you set the correct mime type
            ACL: 'public-read' // Adjust ACL as needed
        };

        // Create and send the upload command
        const command = new PutObjectCommand(uploadParams);
        const uploadData = await s3Client.send(command);
        console.log("File uploaded successfully:", uploadData);

        return {
            success: true,
            file_url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${objectName}`,
        };
    } catch (error) {
        console.error("Error uploading video:", error);
        return { success: false, message: "Failed to upload video", error };
    }
}

const deleteVideoFromS3 = async (bucketName, objectName) => {

    console.log("bucketName: " + bucketName)


    try {
        const deleteParams = {
            Bucket: bucketName,
            Key: objectName
        };
        const command = new DeleteObjectCommand(deleteParams);
        await s3Client.send(command);
        console.log(`Deleted video: ${objectName}`);
    } catch (err) {
        console.error('Error deleting file:', err);
    }
};

module.exports = { uploadFileToAWS, deleteFileFromAWS, deleteVideoFromS3, uploadVideoToS3 }