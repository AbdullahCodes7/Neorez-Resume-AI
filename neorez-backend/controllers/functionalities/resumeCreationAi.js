const OpenAI = require('openai');
const Prompt = require('../../models/Prompt');

const apiKey = process.env.OPENAI_API_KEY;

// Create an instance of OpenAI using your key
const openaiInstance = new OpenAI({
    apiKey: apiKey,
});

async function handleUserInput(req, res) {
    try {
        const { userName, jobTitle, parameters } = req.body;
        const {
            temperature = 0.5,
            // topP = 0.9,
            // presencePenalty = 0.5,
            // frequencyPenalty = 0.0,
            maxTokens,
            model = "gpt-4o",

        } = parameters || {};
        // console.log("Received User Information:", { userName, jobTitle, parameters });

        // Create the initial prompt text
        const promptText = {
            name: userName,
            jobTitle: jobTitle,
            professionalSummary: `Imagine you are a highly capable assistant for creating a detailed and professional resume.

Your task is to assist users in creating a comprehensive resume, ensuring that each section is clearly separated by a distinct heading and includes in-depth information. Provide clear instructions and suggestions for each section to help guide the AI in resume generation. The resume must include the following sections with detailed content:

1. **Guidance**: Provide clear instructions and suggestions for the AI on how to generate an efficient and highly detailed resume.

2. **Professional Summary**: Write a professional summary that thoroughly highlights the user's skills, experience, and career goals under the heading 'Professional Summary'. Include specific details about their expertise, key achievements, and professional strengths.

3. **Work Experience**: List the user's work experience in reverse chronological order under the heading 'Work Experience'. For each role, include:
    - **Job Title**
    - **Company Name**
    - **Dates of Employment**
    - **Location (City, State)**
    - A detailed description of job responsibilities, key achievements, and contributions to the company. Provide bullet points for each responsibility and ensure they are specific and measurable.

4. **Education**: List the user's education background under the heading 'Education'. For each entry, include:
    - **Degree**
    - **Field of Study**
    - **University Name**
    - **Graduation Date**
    - Any notable achievements, honors, or activities related to the degree.

5. **Skills**: List relevant skills under the heading 'Skills' that align with the job title. Include both technical and soft skills, specifying the level of proficiency for each skill.

6. **Certificates**: List any relevant certifications under the heading 'Certificates', if applicable. Provide details about the certification, such as the issuing organization and date obtained.`,

            info: `7. **Additional Information**: Include any additional sections such as interests, languages, or other relevant details under the heading 'Additional Information' that are commonly included in resumes for this job title. Provide details about each entry, ensuring they add value to the resume.,
            Your task is to ensure that the resume is comprehensive, detailed, and suitable for the provided job title. Use a friendly and professional tone, and make the resume easy to understand and visually appealing.
            
8. **Response format** : your response should be in the form of json . Don't add json  at start . just generate json object.Strickly Response must be in json format not in string format.
9. **Response length** : your response should be less than or equal to ${maxTokens} tokens .Adjust the response according to the ${maxTokens} tokens.
`,
            parameters: {
                temperature,
                // topP,
                // presencePenalty,
                // frequencyPenalty,
                maxTokens,
                model
            }
        };


        // Save the initial prompt to the database
        const prompt = new Prompt({ promptText: promptText });
        // await prompt.save();
        // console.log(prompt);

        // Retrieve the saved prompt for processing
        // const savedPrompt = await Prompt.findById(prompt._id);
        // console.log("savedPrompt", savedPrompt);

        // Extract the prompt text from the savedPrompt and parse it
        // const parsedPromptText = JSON.parse(savedPrompt.promptText);
        // console.log("parsedPromptText", parsedPromptText);

        // Generate the resume using the parsed prompt text
        await generateAiResume(prompt, res);
    } catch (error) {
        console.error("Error handling user input:", error);
        res.status(500).send("An error occurred while processing the request.");
    }
}

async function generateAiResume(promptText, res) {
    try {
        // console.log("promptext ========", promptText)

        const { parameters } = promptText;
        // console.log("parameters", parameters)
        const {
            temperature = 0.5,
            // topP = 0.9,
            // presencePenalty = 0.5,
            // frequencyPenalty = 0.0,
            maxTokens = 2000,
            model = "gpt-4o"
        } = parameters || {};

        const { name, jobTitle, professionalSummary, info } = promptText.promptText

        // const promptTextString = JSON.stringify(promptText) // Convert object to string

        // Create the message for OpenAI
        const promptMessage = [
            {
                role: "system",
                content: `
                    You are a highly capable assistant. Follow the instructions strictly and generate the resume in JSON format.
                    Name: ${name}
                    Job Title: ${jobTitle}
                    Professional Summary: ${professionalSummary}
                    Additional Information: ${info}
                `
            },
            {
                role: "user",
                content: `
                    Name: ${name}
                    Job Title: ${jobTitle}
                    

                    Generate resume according to the requirements:
                    - Response format: Your response should be in the form of a JSON object. Do not add "json" at the start; just generate the JSON object.
                    - Response length: Ensure the response is less than or equal to ${maxTokens} tokens.
                `
            }
        ];

        // console.log("promptMessage==========", promptMessage)

        // Log the prompt message and parameters
        // console.log("Prompt message to OpenAI:", JSON.stringify(promptMessage, null, 2));

        // console.log("to openAi ========", promptTextString)

        const stream = await openaiInstance.chat.completions.create({
            model: "gpt-4o",
            response_format: { type: "json_object" },
            messages: promptMessage,
            temperature: 0.5,
            max_tokens: 1500,
            stream: true,
        });

        const generatedResume = await processStream(stream);
        // console.log("generatedResume data:", generatedResume);
        // console.log("generatedResume data:", typeof generatedResume);
        try {
            // Attempt to parse the response data as JSON
            const parsedResponse = JSON.parse(generatedResume);
            // console.log("generatedResume data:", parsedResponse);

            res.json({ aiResume: parsedResponse });
        } catch (err) {
            console.error("Error parsing JSON:", err.message);
            res.status(500).json({ message: 'Failed to parse generated resume as JSON' });
        }
        // const stringResume = generatedResume.split("undefined")[0];
        // console.log("Generated Resume:", stringResume);

        // res.json({ aiResume: generatedResume });
    } catch (e) {
        console.error("Error:", e.message);
        res.json({ message: e.message });
    }
}

async function processStream(stream) {
    let receivedData = '';

    for await (const chunk of stream) {
        if (chunk.object === 'chat.completion.chunk') {

            // console.log("chunk.object==========", chunk.choices[0].delta.content)

            if (chunk.choices[0].delta.content) {
                receivedData += chunk.choices[0].delta?.content
            }


        }
    }

    return receivedData;
}

async function updatePrompt(req, res) {
    const { id } = req.params;
    // console.log(req.params)
    // const { professionalSummary, maxTokens, temperature, model } = req.body.promptText;
    const professionalSummary = req.body.promptText.professionalSummary
    const maxTokens = req.body.promptText.maxTokens
    const temperature = req.body.promptText.temperature
    const model = req.body.promptText.model
    // console.log("body", req.body)

    // console.log("professionalSummary", professionalSummary);
    // console.log("parameters.temperature", temperature);
    // console.log("parameters.model", model);
    // console.log("parameters.maxTokens", maxTokens);
    try {
        // Step 1: Find the existing document
        let prompt = await Prompt.findById(id);

        // console.log("prompt=============", prompt)
        if (!prompt) {
            return res.status(404).json({ message: 'Prompt not found' });
        }
        // console.log("professionalSummary", professionalSummary);
        // console.log("temperature", prompt.promptText.parameters.temperature);
        // console.log("model", prompt.promptText.parameters.maxTokens);
        // console.log("maxTokens", prompt.promptText.parameters.model);

        // Step 2: Update only the necessary fields
        if (professionalSummary) {
            prompt.promptText.professionalSummary = professionalSummary;
            // console.log(prompt.promptText.professionalSummary);

        }

        if (temperature || maxTokens || model) {
            if (!prompt.promptText.parameters) {
                prompt.promptText.parameters = {}; // Ensure parameters object exists
            }

            if (temperature) {
                prompt.promptText.parameters.temperature = temperature;
                // console.log(prompt.promptText.parameters.temperature);

            }
            if (maxTokens) {
                prompt.promptText.parameters.maxTokens = maxTokens;
                // console.log(prompt.promptText.parameters.maxTokens);

            }
            if (model) {
                prompt.promptText.parameters.model = model;
                // console.log(prompt.promptText.parameters.model);

            }
        }

        // console.log("======================================", prompt)
        // Step 3: Save the updated document back to the database
        const updatedPrompt = await Prompt.findByIdAndUpdate(id, { promptText: prompt.promptText })

        // console.log("updatedPrompt=====0-90-980-0-8908900-9798", updatedPrompt)
        res.status(200).json({ updatedPrompt });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getPrompts(req, res) {
    try {
        // Find all prompts in the database
        const prompts = await Prompt.find();
        // console.log(prompts)
        res.status(200).json(prompts);
    } catch (error) {
        // console.error('Error fetching prompts:', error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = { handleUserInput, updatePrompt, getPrompts };
