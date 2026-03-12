const mammoth = require('mammoth');
const OpenAI = require('openai');
const pdf = require('pdf-parse');

const apiKey = process.env.OPENAI_API_KEY;

// Create an instance of OpenAI using your API key
const openaiInstance = new OpenAI({
    apiKey: apiKey,
});

exports.generateChat = async function (text) {
    console.log("--------------------------------AI RESUME----------------------------------------");

    try {
        // Include 'json' in the message content
        const modifiedText = `${text}\n\n(Note: Please respond in JSON format including the word "json".)`;

        // Create the completion with streaming enabled
        const stream = await openaiInstance.chat.completions.create({
            model: 'gpt-4o', // Ensure you are using the correct model
            messages: [{
                role: 'user',
                content: modifiedText // Send the modified prompt
            }],
            response_format: { type: "json_object" },
            stream: true, // Enable streaming
        });

        // Process the streaming response to receive data as a single string
        const receivedString = await processStream(stream);

        // console.log("Received data:", receivedString);
        return receivedString;
    } catch (error) {
        console.error("Error in generateChat:", error.message);
        // Log more details if available
        if (error.response) {
            console.error("Error response data:", error.response.data);
        }
        throw new Error("Failed to generate chat completion");
    }
};
exports.generateChatExtension = async function (data, userPrompt) {
    console.log("--------------------------------AI RESUME----------------------------------------");

    try {
        // Include 'json' in the message content
        const systemPrompt = `
    You are a highly skilled and professional AI assistant for generating personalized cover letters based on user details and job descriptions ${data.description}.

    The task is to create a detailed, engaging, and professional cover letter for the user applying to a specific job. The cover letter should be tailored to the job description provided by the user, emphasizing the skills, experience, and qualifications that make the user a strong candidate for the position.

    The output should be in JSON format as follows:

  
        {
          "description": "This is the body of the cover letter, written to suit the job description and the user's details."
        }
     

    Please ensure that the content is written in a professional tone and highlights the most relevant aspects of the user's profile, aligning it with the job requirements. Be sure to include an opening, body paragraphs that discuss qualifications, and a closing statement.

    When generating the cover letter, use the information provided below:

    - The job description will be detailed in the user input.
    - The user details will be provided in the input as well.
    - Don't include the Dear Hiring Manager, and [Your Name], [Your Address], [City, State, ZIP Code], [Your Email Address], [Your Phone Number], [Date], [Employer's Name], [Company's Name]
    - After the completion of any sentence where the new line or the tag < br /> used then use the double < br /> <br /> tags to create a new line
    
    Make sure to be comprehensive and create a cover letter that stands out to recruiters.

    Thank you.
`;


        // Create the completion with streaming enabled
        const stream = await openaiInstance.chat.completions.create({
            model: 'gpt-4o', // Ensure you are using the correct model

            messages: [{
                role: 'system',
                content: systemPrompt // Send the modified prompt
            }, {
                role: 'user',
                content: userPrompt // Send the modified prompt
            }],
            response_format: { type: "json_object" },
            stream: true, // Enable streaming
        });

        // Process the streaming response to receive data as a single string
        const receivedString = await processStream(stream);

        // console.log("Received data:", receivedString);
        return receivedString;
    } catch (error) {
        console.error("Error in generateChat:", error.message);
        // Log more details if available
        if (error.response) {
            console.error("Error response data:", error.response.data);
        }
        throw new Error("Failed to generate chat completion");
    }
};


exports.generateCoverLetterwithDescriptionExtension = async function (jobDescription, userPrompt) {
    console.log("--------------------------------AI RESUME---------------------------------------- test test ======= ==== ", userPrompt);

    try {
        // Include 'json' in the message content
        const systemPrompt = `
    You are a highly skilled and professional AI assistant for generating personalized cover letters based on user details and job descriptions ${jobDescription}.

    The task is to create a detailed, engaging, and professional cover letter for the user applying to a specific job. The cover letter should be tailored to the job description provided by the user, emphasizing the skills, experience, and qualifications that make the user a strong candidate for the position.

    The output should be in JSON format as follows:

  
        {
          "description": "This is the body of the cover letter, written to suit the job description and the user's details."
        }
     

    Please ensure that the content is written in a professional tone and highlights the most relevant aspects of the user's profile, aligning it with the job requirements. Be sure to include an opening, body paragraphs that discuss qualifications, and a closing statement.

    When generating the cover letter, use the information provided below:

    - The job description will be detailed in the user input.
    - The user details will be provided in the input as well.
    - Don't include the Dear Hiring Manager, and [Your Name], [Your Address], [City, State, ZIP Code], [Your Email Address], [Your Phone Number], [Date], [Employer's Name], [Company's Name]
    - After the completion of any sentence where the new line or the tag < br /> used then use the double < br /> <br /> tags to create a new line
    
    Make sure to be comprehensive and create a cover letter that stands out to recruiters.

    Thank you.
`;


        // Create the completion with streaming enabled
        const stream = await openaiInstance.chat.completions.create({
            model: 'gpt-4o', // Ensure you are using the correct model

            messages: [{
                role: 'system',
                content: systemPrompt // Send the modified prompt
            }, {
                role: 'user',
                content: userPrompt // Send the modified prompt
            }],
            response_format: { type: "json_object" },
            stream: true, // Enable streaming
        });

        // Process the streaming response to receive data as a single string
        const receivedString = await processStream(stream);

        // console.log("Received data:", receivedString);
        return receivedString;
    } catch (error) {
        console.error("Error in generateChat:", error.message);
        // Log more details if available
        if (error.response) {
            console.error("Error response data:", error.response.data);
        }
        throw new Error("Failed to generate chat completion");
    }
};




//regenreate logic of cover letter body 

exports.reGenerateCoverletter = async function (data, userPrompt) {
    console.log("--------------------------------AI RESUME----------------------------------------");

    try {
        // Include 'json' in the message content
        const systemPrompt = `
    You are a highly skilled and professional AI assistant for generating personalized cover letters based on user details.

    The task is to create a detailed, engaging, and professional cover letter for the user. The cover letter should highlight the user’s qualifications, experiences, and suitability for a professional role in a general context.

    you must ensure while generating the cover letter body :
    - regenerate the cover letter body based on the user's details provided by the user.
    - enhance the cover letter body by including the user's experience provided by the user.
    - Donot return same cover letter body.
    - you must regenerate the cover letter body in a more engaging and interesting way.

    The output should be in JSON format as follows. output structure must be as follows:

    {
        "description": "This is the body of the cover letter, written based on the user's details."
    }

    Please ensure that the content is written in a professional tone and follows the typical structure of a cover letter:
    - **Opening**: A polite introduction expressing the user's intent.
    - **Body**: A paragraph discussing the user's qualifications and experiences in a general professional context.
    - **Closing**: A closing statement reaffirms the user's enthusiasm for a potential opportunity.

    Do not include any personal contact information such as:
    - "[Your Name], [Your Address], [City, State, ZIP Code], [Your Email Address], [Your Phone Number], [Date], [Employer's Name], [Company's Name], Dear Hiring Manager."
    
    The cover letter should be well-written, professional, and emphasize the user's general suitability for a position, without focusing on any specific job description or role.

    Thank you.
`;


        // console.log("systemPrompt", systemPrompt)
        // Create the completion with streaming enabled
        let messages = [
            {
                role: 'system',
                content: systemPrompt // Send the modified prompt
            },
            {
                role: 'user',
                content: userPrompt // Send the modified prompt
            }]

        // console.log("messages", messages)
        const stream = await openaiInstance.chat.completions.create({
            model: 'gpt-4o', // Ensure you are using the correct model

            messages: messages,
            response_format: { type: "json_object" },
            stream: true, // Enable streaming
        });

        // Process the streaming response to receive data as a single string
        const receivedString = await processStream(stream);

        // console.log("Received data: there", receivedString);
        return receivedString;
    } catch (error) {
        console.error("Error in generateChat:", error.message);
        // Log more details if available
        if (error.response) {
            console.error("Error response data:", error.response.data);
        }
        throw new Error("Failed to generate chat completion");
    }
};


exports.pdfCoverLetterGenerateWithExtensionDescription = async function (bodydata, fileBuffer, mimeType) {
    try {
        // console.log("bodydata", bodydata);
        // console.log("fileBuffer", fileBuffer);
        // console.log("mimeType", mimeType);

        let extractedText = "";

        if (mimeType === "application/pdf") {
            // Extract text from PDF
            const data = await pdf(fileBuffer);
            // console.log("Extracted PDF Data:", data.text);
            extractedText = data.text;
        } else if (
            mimeType === "application/msword" ||
            mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            // Extract text from DOC/DOCX
            const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
            // console.log("Extracted DOC/DOCX Data:", value);
            extractedText = value;
        } else {
            throw new Error("Unsupported file type. Please upload a PDF, DOC, or DOCX file.");
        }

        // Send the extracted text to AI chat generation
        const response = await generatePdfCoverLetterWithDescription(bodydata?.description, extractedText);
        return response;
    } catch (error) {
        console.error("Error extracting text:", error.message);
        throw new Error("Failed to process the file. Please try again.");
    }
};


async function generatePdfCoverLetterWithDescription(jobDescription, text) {
    // console.log("--------------------------------AI COVER LETTER----------------------------------------");
    try {
        const stream = await openaiInstance.chat.completions.create({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "user",
                    content: `This is my cover letter data: ${text}. Below is the job description: ${jobDescription}. Use both the cover letter data and the job description to generate a tailored cover letter. If some details are missing, infer them logically based on the job description and the provided data. 

### Guidelines for Cover Letter Generation:

1. **Input Variability**: You will receive the user's cover letter data and a job description:
   
   - Combine the information from both inputs to create a professional, concise, and tailored cover letter.
   - Ensure all provided details are included and relevant to the job description.
   - Maintain proper grammar, punctuation, and capitalization throughout.
   - Use a formal tone suitable for job applications.

2. **How to generate the opening paragraph**:
  

3. **How to structure the body**:

 - Include the job title and company name from the job description.
   - Briefly introduce the applicant and highlight their relevance to the job.
   - Generally, you must aim for a cover letter word count of 250 to 400 words and must include the three paragraphs and after each paragraph use the <\br> tag for next line in there.
   - Highlight the applicant's relevant skills, experiences, and achievements that match the job description.
   - Use specific examples from the cover letter to demonstrate qualifications and value to the company.
   - Address any missing or inferred details logically based on the job description.

    - Reiterate enthusiasm for the role and the value the applicant brings.
   - Include a professional call-to-action (e.g., availability for an interview).

4. **How to write the regards**: 
   - Sign off with a formal closing (e.g., "Sincerely,").

5. **How to handle missing details**:
   - If the user's cover letter data lacks specific information (e.g., name, email, phone number), generate placeholders with appropriate formatting.

6. **Response Structure**:
   - Return a JSON object with the following structure:
     
     {
       "title": "Cover Letter",
       "name": "",  // Full name of the applicant
       "jobTitle": "",  // Job title from the job description
       "company": "",  // Company name from the job description
       "body": [
         {
           "description": ""  // Key achievements, skills, and experiences
         },
         {
           "description": ""  // Key achievements, skills, and experiences
         },
         
         
       ],
 
       "name":""
  
         "email": "",  // Applicant's email
         "phone": "",  // Applicant's phone number
         "address": ""  // Applicant's address
    
       "date": ""  // Current date
     }

7. **Output Format**: Ensure the response is valid JSON and formatted exactly as described above, with no additional text or alterations to the key names.

**Compliance**: Follow the rules above rigorously to ensure the generated cover letter meets user expectations and requirements.

Your task is to take the input data, apply the guidelines above, and return a cover letter formatted as specified.`,
                },
            ],
            stream: true,
            stream_options: { include_usage: true }, // Include token usage
        });

        // Process the response from the AI
        const receivedString = await processStream(stream);
        return receivedString;
    } catch (er) {
        console.log(er);
        return er;
    }
}


// Helper function to process the stream and accumulate data
async function processStream(stream) {
    let receivedData = '';

    for await (const chunk of stream) {
        // Collect the content of each chunk
        if (chunk.choices && chunk.choices.length > 0) {
            receivedData += chunk.choices[0].delta?.content || '';
        }
    }

    return receivedData;
}
