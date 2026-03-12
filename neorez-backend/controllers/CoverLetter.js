const CoverLetterModel = require('../models/CoverLetter');
const CoverLetterPrompt = require('../models/CoverLetterPrompt');
const resumeGeneration = require("./functionalities/OpenAi");
const CoverLetterGeneration = require("./functionalities/OpenAi");
const CoverLetterGenerationAi = require("./functionalities/coverLetterAi");
// Create a new cover letter
// exports.createOrUpdateCoverLetter = async (req, res) => {
//     try {
//         const coverLetterData = req.body;
//         console.log("req.body", req.body);
//         const { userId, uid } = coverLetterData;

//         if (uid) {
//             // Check if cover letter exists based on userId, templateId, and uid
//             let existingCoverLetter = await CoverLetterModel.findOne({ userId, uid });

//             if (existingCoverLetter) {
//                 // Update the existing cover letter
//                 existingCoverLetter = await CoverLetterModel.findOneAndUpdate(
//                     { userId, uid },
//                     coverLetterData,

//                 );
//                 return res.status(200).json(existingCoverLetter);
//             }
//         }

//         // Remove _id from coverLetterData if it exists to avoid duplicate key errors
//         if (coverLetterData._id) {
//             delete coverLetterData._id;
//         }

//         // Create a new cover letter if no matching document is found
//         const newCoverLetter = new CoverLetterModel(coverLetterData);
//         await newCoverLetter.save();

//         // Return the newly created cover letter including the generated coverLetterId (_id)
//         res.status(201).json(newCoverLetter);
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ error: error.message });
//     }
// };

exports.createOrUpdateCoverLetter = async (req, res) => {
    try {
        const coverLetterData = req.body;
        // console.log("req.body", req.body);
        const { userId, uid } = coverLetterData;

        // Remove _id from coverLetterData if it exists to avoid attempting to update the immutable field '_id'
        if (coverLetterData._id) {
            delete coverLetterData._id;
        }

        // Check if cover letter exists based on userId and uid
        let existingCoverLetter = await CoverLetterModel.findOne({ userId, uid });

        if (existingCoverLetter) {
            // If the cover letter exists, update all the data
            existingCoverLetter = await CoverLetterModel.findOneAndUpdate(
                { userId, uid },      // Find the cover letter based on userId and uid
                { $set: coverLetterData },  // Update all the fields in the existing document
                { new: true }          // Return the updated document
            );

            return res.status(200).json(existingCoverLetter);  // Return the updated cover letter
        } else {
            // If the cover letter does not exist, create a new one
            const newCoverLetter = new CoverLetterModel(coverLetterData);
            await newCoverLetter.save();

            return res.status(201).json(newCoverLetter);  // Return the newly created cover letter
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};



// exports.generateCoverLetter = async (req, res) => {
//     const data = req.body;
//     // console.log("body Data", data);
//     //     let prompt = `Here is the job description of position where I want to apply; "${data.jobDescription}".
//     // job description ended here. My Name is ${data.name}. My role is ${data.role}. My address is ${data.address}. Zip Code is ${data.zipCode}. My email is ${data.email}. My phone Number is ${data.phone}. I graduated from ${data.universityName} in ${data.graduatingYear} with major in ${data.major}. My Skills are ${data.skills}. I have certificate in ${data.certificates}. I know ${data.languages}. My linkedin is ${data.linkedin}. Make a cv for me tailored for the above provided job description. Include name, phone, email, linkedin, role, summary, experience(array) template, education(array), skills(array), certificates, langauges(array) and whatever relavant sections according to job description. It should be ready to submit without any edit. Result should be in JSON format so that I can put the data in CV template. Required keys are name, address, email, phone, linkedin, role, summary, languages(array) with default value english and urdu, education(array) with default value of empty array, experience(array) with default value of empty array, skills(array) with default value of empty array. Also add other suitable keys. Your response should be only json nothing else.`
//     let prompt = `${JSON.stringify(data.title)}
//     Above is my job Title. ${data.description ? `${JSON.stringify(data.description)} This is my job description.` : ""} Generate cover letter for it according to job title and job description. The response should be formatted. For new line use escape sequences. don't add the Dear Hiring Manager, . Also, you must separate every paragraph with newline escape sequence as well to add a line break after each paragraph. Only use newline escape sequence for new lines. The response should be a string with generated cover letter with escape sequences for new lines and don't add the Sincerely,[your name]`;
//     // console.log(prompt);


//     try {
//         const generatedResume = await resumeGeneration.generateChat(prompt);
//         const stringResume = generatedResume.split("undefined")[0];
//         // console.log(stringResume);
//         // console.log(JSON.parse(stringResume));
//         res.json({ coverletter: stringResume });
//     } catch (e) {
//         console.log(e.message);
//         res.json({ "message": e.message });
//     }

// }

// Get all cover letters


//this is for to save the coverletter with prompt
// exports.generateCoverLetter = async (req, res) => {
//     const data = req.body;

//     // Constructing the header and body
//     const header = `${JSON.stringify(data.title)} `

//     const body = `Generate cover letter for it according to job title and job description. The response should be formatted. 
// For new line use escape sequences. Don't add the Dear Hiring Manager. 
// Replace all instances of double newlines (\\n\\n) with <br /> tags
// Also, you must separate every paragraph with newline escape sequence as well to add a line break after each paragraph. 
// Only use newline escape sequence for new lines. The response should be a string with generated cover letter with escape sequences for new lines and don't add the Sincerely, [your name].`;

//     // Log header and body for debugging
//     console.log("Header:", header);
//     console.log("Body:", body);

//     try {
//         // Combine header and body, ensuring "json" is mentioned
//         const prompt = `${header} ${body} (Ensure the output is in JSON format.)`;
//         const generatedCoverLetter = await CoverLetterGeneration.generateChat(prompt);

//         // const stringCoverLetter = generatedCoverLetter.split("undefined")[0];
//         // const stringResume = generatedResume.split("undefined")[0];

//         // Prepare the promptText object for storage
//         // const promptText = {
//         //     header,
//         //     parameters: {
//         //         temperature: "0.5", // Example value, change as needed
//         //         maxTokens: "1500", // Example value, change as needed
//         //         model: "gpt-4o", // Example value, change as needed
//         //     },
//         //     body: generatedCoverLetter, // The generated cover letter
//         // };

//         // // Save the constructed promptText object to the database
//         // await savePromptToDatabase(promptText);

//         res.json({ coverletter: JSON.parse(generatedCoverLetter) });
//     } catch (e) {
//         console.log(e.message);
//         res.json({ "message": e.message });
//     }
// };

exports.generateCoverLetter = async (req, res) => {
    try {
        const promptId = "671200dca57d01869ccc25bb"; // ID of the saved prompt
        // const savedPrompt = await getPromptFromDatabase(promptId); // Fetch the existing prompt

        // if (!savedPrompt) {
        //     return res.status(404).json({ message: "Prompt not found in the database." });
        // }

        // console.log("savedPrompt", savedPrompt);
        // console.log("req.body", req.body);

        // Extract the header and body from the database-stored prompt
        // let promptHeader = req.body.designation;
        // let promptBody = savedPrompt.promptText.body;

        // Extract the user data from the request body (req.body)
        const userData = req.body;

        // Replace placeholders in the header and body with actual data from user input (req.body)
        // promptHeader = promptHeader?.replace('${job title}', userData.designation);

        // Combine the header and body to form the full prompt
        // const fullPrompt = `${promptHeader} ${promptBody}`;
        const fullPrompt = `You are an AI assistant for generating professional cover letters. Based on the following user-provided details, create a detailed and engaging cover letter body:
    
    User Details: ${JSON.stringify(`${userData.designation}`)}

    Must ensure to:
    - Replace all instances of double newlines (\\n\\n) with <br /><br /> tags.
    - Exclude the following placeholders from the response: 
      [Your Name], [Your Address], [City, State, ZIP Code], [Your Email Address], [Your Phone Number], [Date], 
      [Employer's Name], [Company's Name], [Company's Address], [City, State, ZIP Code], and "Dear [Employer's Name]".
    - Include a concise, clear, and informative cover letter body that highlights your skills, experience, and achievements.
    - Donot add any extra information or any extra text.

    The response should be formatted in JSON as given below.
    { 
    "coverLetter":""
    }
    Do not include any markdown formatting or code block indicators in the response.
`;

        // Now that the fullPrompt has been created, send it to OpenAI for generation
        const gptResponse = await CoverLetterGeneration.generateChatCoverletter({
            prompt: fullPrompt, // Send the modified prompt (header + body)
            temperature: 0.3 || parseFloat(savedPrompt.promptText.temperature),
            maxTokens: 1000 || Number(savedPrompt.promptText.maxTokens),
            model: "gpt-4o" || savedPrompt.promptText.model,
        });

        // console.log("gptResponse", gptResponse);

        // Check if the response contains `choices` array or handle as string
        let coverLetter;
        if (gptResponse && gptResponse.choices && gptResponse.choices.length > 0) {
            coverLetter = gptResponse.choices[0].text;
        } else {
            coverLetter = typeof gptResponse === 'string' ? gptResponse : 'Failed to generate cover letter';
        }

        // Parse and clean up the cover letter before returning it
        const parsedCoverLetter = JSON.parse(coverLetter);

        // Return the generated cover letter as the response
        res.json({
            message: "Cover letter generated successfully.",
            coverLetter: parsedCoverLetter, // Return the cleaned/generated cover letter
            designation: userData?.designation,
            phone: userData?.phone,
            location: userData?.location,
            email: userData?.email,
            name: userData?.name
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: e.message });
    }
};



const getPromptFromDatabase = async (promptId) => {
    try {
        const prompt = await CoverLetterPrompt.findById(promptId); // Assuming Mongoose and MongoDB
        return prompt;
    } catch (e) {
        console.log(e.message);
        throw new Error('Database error while fetching the prompt');
    }
};


const savePromptToDatabase = async (promptText) => {
    // console.log("Prompttext============", promptText)
    try {
        const promptData = new CoverLetterPrompt({
            promptText: promptText,
        });
        await promptData.save();
        // console.log("Prompt saved to database successfully!");
    } catch (error) {
        console.log(error)
        console.error("Error saving prompt to database:", error.message);
    }
};



//Update prompt

// exports.updatePrompt = async (req, res) => {
//     const { id, newTitle, newDescription } = req.body; // Extract id and new values from the request body

//     // Constructing the updated header and body
//     const updatedHeader = `${JSON.stringify(newTitle)} 
//     ${newDescription ? `${JSON.stringify(newDescription)} This is my job description.` : ""}`;

//     const updatedBody = `Generate cover letter for it according to job title and job description. The response should be formatted in JSON. 
//     For new line use escape sequences. Don't add the Dear Hiring Manager. 
//     Also, you must separate every paragraph with newline escape sequence as well to add a line break after each paragraph. 
//     Only use newline escape sequence for new lines. The response should be a string with generated cover letter with escape sequences for new lines and don't add the Sincerely, [your name].`;

//     // Log the updated header and body for debugging
//     console.log("Updated Header:", updatedHeader);
//     console.log("Updated Body:", updatedBody);

//     try {
//         // Save the updated header and body to the database
//         await updatePromptInDatabase(id, updatedHeader, updatedBody); // Implement this function to update in the DB

//         res.json({ message: "Prompt updated successfully!" }, updatedBody);
//     } catch (e) {
//         console.log(e.message);
//         res.status(500).json({ message: "Error updating the prompt." });
//     }
// };

// Helper function to update the prompt in the database
exports.updatePromptInDatabase = async (req, res) => {
    const { id } = req.params; // Get the id from req.params
    // const { header, body } = req.body; // Get header and body from req.body
    // console.log(req.body)
    try {
        // Update the database record
        await CoverLetterPrompt.updateOne(
            { _id: id },
            {
                promptText: req.body.promptText
            }
        );

        // console.log("Prompt updated in the database successfully.");
        res.status(200).json({ message: "Prompt updated successfully" });
    } catch (error) {
        console.error("Error updating the prompt in the database:", error.message);
        res.status(500).json({ message: "Database update failed" }); // Respond with error
    }
};


// Function to retrieve a prompt by ID
exports.getPromptById = async (req, res) => {
    const { id } = req.params; // Extracting the ID from the request parameters

    try {
        // Find the prompt in the database by ID
        const prompt = await CoverLetterPrompt.findById(id);

        // console.log(prompt)
        if (!prompt) {
            return res.status(404).json({ message: "Prompt not found." });
        }

        // Return the found prompt
        res.json({
            id: prompt._id,
            promptText: prompt.promptText
        });
    } catch (error) {
        console.error("Error fetching the prompt:", error.message);
        res.status(500).json({ message: "Error fetching the prompt." });
    }
};

exports.getAllCoverLetters = async (req, res) => {
    try {
        const userId = req.params.id;
        const coverLetters = await CoverLetterModel.find({ userId });
        // console.log("coverLetters", coverLetters)
        res.status(200).json(coverLetters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single cover letter by ID
exports.getCoverLetterById = async (req, res) => {
    try {
        const { uid } = req.params;

        // Use findOne instead of find
        const coverLetter = await CoverLetterModel.findOne({ uid });

        // console.log("cover letter by uid", coverLetter)

        // Check if coverLetter is null
        if (!coverLetter) {
            return res.status(404).json({ error: 'CoverLetter not found' });
        }

        // Return the single cover letter object
        res.status(200).json(coverLetter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update a cover letter by ID
exports.updateCoverLetter = async (req, res) => {
    try {
        const updatedCoverLetter = await CoverLetterModel.findByIdAndUpdate(
            req.params.id,
            req.body,

        );
        if (!updatedCoverLetter) return res.status(404).json({ error: 'CoverLetter not found' });
        res.status(200).json(updatedCoverLetter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a cover letter by ID

exports.deleteCoverLetter = async (req, res) => {
    try {
        const CoverLetterId = req.params.id;
        // console.log("CoverLetterId", CoverLetterId)
        const deletedCoverLetter = await CoverLetterModel.findOneAndDelete({ uid: CoverLetterId })
        // console.log(deletedCoverLetter)
        if (!deletedCoverLetter) return res.status(404).json({ error: 'CoverLetter not found' });
        res.status(200).json({ message: 'CoverLetter deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};


exports.generateCoverLetterBody = async (req, res) => {
    const data = req.body;
    // console.log("coverletter data", req.body)
    // Create a concise prompt to generate a summary based on the data provided
    const prompt = `
    You are an AI assistant for generating professional cover letters. Based on the following user-provided details, create a detailed and engaging cover letter body:
    
    User Details: ${JSON.stringify(data)}

    Must ensure to:
    - Replace all instances of double newlines (\\n\\n) with <br /> tags.
    - Exclude the following placeholders from the response: 
      [Your Name], [Your Address], [City, State, ZIP Code], [Your Email Address], [Your Phone Number], [Date], 
      [Employer's Name], [Company's Name], [Company's Address], [City, State, ZIP Code], and "Dear [Employer's Name]".
    - Include a concise, clear, and informative cover letter body that highlights your skills, experience, and achievements.
    - Donot add any extra information or any extra text.

    The response should be formatted in JSON as given below.
    { 
    body: [
    {
      description: ""
    }
  ]
    }
    `;
    // console.log("Generated Prompt:", prompt);

    try {
        // Assuming you have a service or function (resumeGeneration.generateChat) that interacts with OpenAI or a similar API
        const generatedResponse = await resumeGeneration.generateChatCoverletter(prompt);

        // Ensure that the response contains valid JSON, parsing it
        const jsonResponse = JSON.parse(generatedResponse);

        // Log the parsed response for debugging
        // console.log("Parsed Resume Summary:", jsonResponse);

        // Send the JSON response to the client
        res.json(jsonResponse);

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error generating summary:", error.message);

        // Send the error message back to the client in JSON format
        res.status(500).json({ "message": error.message });
    }
};
exports.generateCoverLetterExtension = async (req, res) => {
    // const data = req.body;
    // console.log(req.body)
    // Create a concise prompt to generate a summary based on the data provided
    const userPrompt = `
    I am seeking to create a professional cover letter that highlights my qualifications, experience, and general strengths for any job role.

    Please help me generate a cover letter that includes the following sections:
    - **Introduction**: A brief statement explaining why I am a strong candidate, highlighting my general strengths and qualifications for any professional role.
    - **Body**: A discussion of my relevant skills, qualifications, and experiences that make me confident in my ability to contribute to any professional setting.
    - **Passion for the Role**: An explanation of why I am passionate about working in a professional environment and contributing to the success of any company.
    - **Closing Statement**: A statement expressing my interest in a potential interview and my enthusiasm for contributing to an organization.

    The cover letter should be written in a professional and polite tone, following these guidelines:
    - The introduction should emphasize my general strengths and qualifications without referencing any specific job or employer.
    - The body should outline my experiences and skills, showcasing how I can add value to a variety of professional roles.
    - The closing should express my eagerness to explore potential opportunities and my readiness for an interview.

    **Important**: Do not include any personal contact information, specific job descriptions, or employer names. The letter should be general, suitable for any professional job application, and should not reference a specific job position or company.

    Please ensure the cover letter is well-structured, engaging, and reflects my passion for contributing to a company’s success.

 structure of the output is as follows:
 {
  "description": ""
}


`;



    // console.log("Generated Prompt:", prompt);

    try {
        // Assuming you have a service or function (resumeGeneration.generateChat) that interacts with OpenAI or a similar API
        const generatedResponse = await CoverLetterGenerationAi.generateChatExtension(data, userPrompt);

        // Ensure that the response contains valid JSON, parsing it
        const jsonResponse = JSON.parse(generatedResponse);

        // Log the parsed response for debugging
        // console.log("Parsed Resume Summary:", jsonResponse);

        // Send the JSON response to the client
        res.json(jsonResponse);

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error generating summary:", error.message);

        // Send the error message back to the client in JSON format
        res.status(500).json({ "message": error.message });
    }
};

exports.ReGenerateCoverLetterBody = async (req, res) => {
    const data = req.body;
    // console.log("coverletter data", req.body?.requestData?.prompt)
    // Create a concise prompt to generate a summary based on the data provided
    const prompt = `
    You are an AI assistant for generating professional cover letters. Based on the following user-provided details, create a detailed and engaging cover letter body:
    
    User Details: ${JSON.stringify(data.requestData.prompt)}

    Must ensure to:
    - Replace all instances of double newlines (\\n\\n) with <br /> tags.
    - Exclude the following placeholders from the response: 
      [Your Name], [Your Address], [City, State, ZIP Code], [Your Email Address], [Your Phone Number], [Date], 
      [Employer's Name], [Company's Name], [Company's Address], [City, State, ZIP Code], and "Dear [Employer's Name]".
    - Include a concise, clear, and informative cover letter body that highlights your skills, experience, and achievements.
    - Regenerate the cover letter body using the provided data ${JSON.stringify(data.requestData.prompt)}.
    - Donot add any extra information or any extra text.

    The response should be formatted in JSON as given below.
    { 

      description: ""

    }
    `;
    // console.log("Generated Prompt:", prompt);

    try {
        // Assuming you have a service or function (resumeGeneration.generateChat) that interacts with OpenAI or a similar API
        const generatedResponse = await CoverLetterGenerationAi.reGenerateCoverletter(data, prompt);

        // Ensure that the response contains valid JSON, parsing it
        const jsonResponse = JSON.parse(generatedResponse);

        // Log the parsed response for debugging
        // console.log("Parsed Resume Summary:", jsonResponse);

        // Send the JSON response to the client
        res.json(jsonResponse);

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error generating summary:", error.message);

        // Send the error message back to the client in JSON format
        res.status(500).json({ "message": error.message });
    }
};

exports.pdfCoverLetterWithExtensionDescription = async (req, res) => {
    // console.log(req.files);
    const { cv } = req.files;
    const { title, company, description } = req.body;
    // console.log("title", title);
    // console.log("company", company);
    // console.log("description", description);
    try {
        // cv.mv(path.join(assetsFolder, cv.name));
        const mimeType = cv.mimetype;
        // console.log("mimeType =====", mimeType)
        // res.status(200).json({ "message": "ok" })
        // const pdfPath = './SherazCV.pdf';
        // console.log(pdfPath);
        const generatedPdfResume = await CoverLetterGenerationAi.pdfCoverLetterGenerateWithExtensionDescription(req.body, cv.data, mimeType);
        // console.log(generatedPdfResume);
        const stringResume = generatedPdfResume?.split("undefined")[0];
        // console.log(generatedPdfResume);
        // console.log("ss");
        // console.log(stringResume);
        res.json(JSON.parse(stringResume));
    }
    catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }

}


// exports.generateCoverLetterExtensionDescription = async (req, res) => {
//     // const data = req.body;

//     console.log("req.body", req.body)
//     const { uid, jobDescription } = req.body;
//     console.log(JSON.stringify(jobDescription))

//     const coverLetter = await CoverLetterModel({ uid })

//     console.log("coverLetter", coverLetter)

//     if (!coverLetter) {
//         return res.status(404).json({ message: "Cover Letter not found." });
//     }
//     // Create a concise prompt to generate a summary based on the data provided
//     const userPrompt = `
// Make sure that the cover letter should be based on the ${JSON.stringify(jobDescription)} and the ${JSON.stringify(coverLetter)} 
// Job Title: ${jobDescription.jobTitle}
//    create a professional cover letter that highlights my qualifications, experience, and general strengths for any job role.

//     Please help me generate a cover letter that includes the following sections:
//     - **Introduction**: A brief statement explaining why I am a strong candidate, highlighting my general strengths and qualifications for any professional role.
//     - **Body**: A discussion of my relevant skills, qualifications, and experiences that make me confident in my ability to contribute to any professional setting.
//     - **Passion for the Role**: An explanation of why I am passionate about working in a professional environment and contributing to the success of any company.
//     - **Closing Statement**: A statement expressing my interest in a potential interview and my enthusiasm for contributing to an organization.

//     The cover letter should be written in a professional and polite tone, following these guidelines:
//     - The introduction should emphasize my general strengths and qualifications without referencing any specific job or employer.
//     - The body should outline my experiences and skills, showcasing how I can add value to a variety of professional roles.
//     - The closing should express my eagerness to explore potential opportunities and my readiness for an interview.

//     **Important**: Do not include any personal contact information, specific job descriptions, or employer names. The letter should be general, suitable for any professional job application, and should not reference a specific job position or company.

//     Please ensure the cover letter is well-structured, engaging, and reflects my passion for contributing to a company’s success.
//     Ensure that dont added the Sincerely etc at the end

//  structure of the output is as follows:
//  {
//   "description": "Your generated cover letter here",
//   jobTitle: ${jobDescription.jobTitle}
// }


// `;
//     // console.log("Generated Prompt:", prompt);

//     try {
//         // Assuming you have a service or function (resumeGeneration.generateChat) that interacts with OpenAI or a similar API
//         const generatedResponse = await CoverLetterGenerationAi.generateCoverLetterwithDescriptionExtension(jobDescription, userPrompt);

//         // Ensure that the response contains valid JSON, parsing it
//         const jsonResponse = JSON.parse(generatedResponse);

//         // Log the parsed response for debugging
//         // console.log("Parsed Resume Summary:", jsonResponse);

//         // Send the JSON response to the client
//         res.json(jsonResponse);

//     } catch (error) {
//         // Log the error for debugging purposes
//         console.error("Error generating summary:", error.message);

//         // Send the error message back to the client in JSON format
//         res.status(500).json({ "message": error.message });
//     }
// };



exports.generateCoverLetterExtensionDescription = async (req, res) => {
    const { uid, jobDescription } = req.body;

    // console.log("Request received with UID:", uid);
    // console.log("Job Description:", JSON.stringify(jobDescription));

    try {
        // Attempt to find an existing cover letter for the given UID
        const coverLetter = await CoverLetterModel.findOne({ uid });

        // console.log("CoverLetter:", coverLetter);

        if (!coverLetter) {
            // If no cover letter is found, proceed to generate a new one based on the job description
            // console.log("Cover letter not found, proceeding with generation.");

            // Create a concise prompt for generating the cover letter summary
            const userPrompt = `
Make sure that the cover letter should be based on the ${JSON.stringify(jobDescription)}. 
Job Title: ${jobDescription.jobTitle}
create a professional cover letter that highlights my qualifications, experience, and general strengths for any job role.

Please help me generate a cover letter that includes the following sections:
- **Introduction**: A brief statement explaining why I am a strong candidate, highlighting my general strengths and qualifications for any professional role.
- **Body**: A discussion of my relevant skills, qualifications, and experiences that make me confident in my ability to contribute to any professional setting.
- **Passion for the Role**: An explanation of why I am passionate about working in a professional environment and contributing to the success of any company.
- **Closing Statement**: A statement expressing my interest in a potential interview and my enthusiasm for contributing to an organization.

The cover letter should be written in a professional and polite tone, following these guidelines:
- The introduction should emphasize my general strengths and qualifications without referencing any specific job or employer.
- The body should outline my experiences and skills, showcasing how I can add value to a variety of professional roles.
- The closing should express my eagerness to explore potential opportunities and my readiness for an interview.

**Important**: Do not include any personal contact information, specific job descriptions, or employer names. The letter should be general, suitable for any professional job application, and should not reference a specific job position or company.

Please ensure the cover letter is well-structured, engaging, and reflects my passion for contributing to a company’s success.
Ensure that you don't add "Sincerely" or similar phrases at the end.

structure of the output is as follows:
{
  "description": "Your generated cover letter here",
  jobTitle: ${jobDescription.jobTitle}
}
            `;

            // Proceed with the cover letter generation since it was not found
            const generatedResponse = await CoverLetterGenerationAi.generateCoverLetterwithDescriptionExtension(jobDescription, userPrompt);

            // Ensure that the response contains valid JSON
            const jsonResponse = JSON.parse(generatedResponse);

            // Send the generated cover letter response to the client
            res.json(jsonResponse);

        } else {
            // If a cover letter is found, pass the entire cover letter data to the AI prompt for generation
            // console.log("Found existing cover letter:", coverLetter);

            // Modify the cover letter with the new jobTitle and description from jobDescription
            coverLetter.description = `<p>${jobDescription.description || "I am writing to express my interest in this position."}</p>`; // Update description
            coverLetter.jobTitle = jobDescription.jobTitle || coverLetter.jobTitle; // Modify jobTitle if provided

            // Create a prompt using the entire cover letter data to generate a new version
            const userPrompt = `
Make sure that the cover letter should be based on the existing cover letter data ${JSON.stringify(coverLetter)} and the job description ${JSON.stringify(jobDescription)}.
Job Title: ${jobDescription.jobTitle}
create a professional cover letter that highlights my qualifications, experience, and general strengths for any job role.

Please help me generate a cover letter that includes the following sections:
- **Introduction**: A brief statement explaining why I am a strong candidate, highlighting my general strengths and qualifications for any professional role.
- **Body**: A discussion of my relevant skills, qualifications, and experiences that make me confident in my ability to contribute to any professional setting.
- **Passion for the Role**: An explanation of why I am passionate about working in a professional environment and contributing to the success of any company.
- **Closing Statement**: A statement expressing my interest in a potential interview and my enthusiasm for contributing to an organization.

The cover letter should be written in a professional and polite tone, following these guidelines:
- The introduction should emphasize my general strengths and qualifications without referencing any specific job or employer.
- The body should outline my experiences and skills, showcasing how I can add value to a variety of professional roles.
- The closing should express my eagerness to explore potential opportunities and my readiness for an interview.

**Important**: Do not include any personal contact information, specific job descriptions, or employer names. The letter should be general, suitable for any professional job application, and should not reference a specific job position or company.

Please ensure the cover letter is well-structured, engaging, and reflects my passion for contributing to a company’s success.
Ensure that you don't add "Sincerely" or similar phrases at the end.

structure of the output is as follows:
{
  "description": "Your generated cover letter here",
  jobTitle: ${jobDescription.jobTitle}
   name: ${coverLetter.name},
  address: ${coverLetter.address},
  location: ${coverLetter.location},
  phone: ${coverLetter.phone},
  email: ${coverLetter.email},
   company: ${coverLetter.company},
  date: ${coverLetter.date},
  letterTo:${coverLetter.letterTo},
   
}
            `;

            // Proceed with the cover letter generation using existing cover letter data and job description
            const generatedResponse = await CoverLetterGenerationAi.generateCoverLetterwithDescriptionExtension(jobDescription, userPrompt);

            // Ensure that the response contains valid JSON
            const jsonResponse = JSON.parse(generatedResponse);

            // Send the generated cover letter response to the client
            res.json(jsonResponse);
        }

    } catch (error) {
        console.error("Error generating or retrieving cover letter:", error.message);

        // Send error message back to the client in case of failure
        res.status(500).json({ message: error.message });
    }
};
