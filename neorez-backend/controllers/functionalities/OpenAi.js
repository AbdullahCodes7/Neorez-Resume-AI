const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY;

// Create an instance of OpenAI using your API key
const openaiInstance = new OpenAI({
  apiKey: apiKey,
});

exports.generateChat = async function ({ jobDescription, jobTitle, name, email, contactNumber, previousCvData, country, city, prompt }) {
  // console.log("--------------------------------AI RESUME----------------------------------------", { jobDescription, city, country, jobTitle, name, email, contactNumber, previousCvData, prompt });
  // console.log("text.jobDescription", jobDescription)

  // Determine if the prompt is jobDescription-related
  const isJobDescription = jobDescription && jobDescription.trim() !== '';
  const extension = isJobDescription ? true : false;  // Set extension to true if jobDescription is provided
  // console.log("extension", extension)

  const system_prompt = `
You are an AI tasked with generating a comprehensive CV based on provided user input. Your responses must strictly adhere to the given JSON format, using the specified  names without any modifications or additions  .The response should be formatted in a JSON structure.

Now my job title is : ${jobTitle || ""}
Now my job description is :${jobDescription || ""} 
Now my previous cv data is  :${previousCvData || ""} 
Now cv holder name  :${name || ""} 
Now cv holder email  :${email || ""} 
Now cv holder contactnumber  :${contactNumber || ""} 
Now cv holder city  :${city || ""} 
Now cv holder country  :${country || ""} 

### Extension Flag: ${extension}  // Added Extension Flag

### Guidelines for CV Generation:

1. **Input Variability**: You may receive various combinations of input data, including:
   - Both Job title and job description.
   - Only job title.
   - Only job description.
   - Previous CV data to create a new CV.

2. **How to generate jobTitle**

   - if the job title and job decription both are "" then assume the job title based on the previous cv data.
   - if the job title are "" then assume the job title based on the job description. so understand the job description to generate the job title.


3. **How to generate profile data**
-  - if the cv is generated based on the Job title or job description then use provided name , email , contact number . if any of these are missing then generate this specific random .
   - if the cv is generated based on the previous cv data then you must use provided  previous cv  name , email , contact number . if any of these are missing then generate this specific random .


4. **How to generate summary**
  - if the cv is generated based on the Job title or job description . Then  generate a summary based on the job description or jobtitle.
  - if the cv is generated based on the previous cv data then generate summary using previous cv data .

5. **How to generate education**
  - if the cv is generated based on the Job title or job description . Then  generate a education based on the job description or jobtitle.
  - if the cv is generated based on the previous cv data then use previous cv education data .

6. **How to generate workExperience**
  - if the cv is generated based on the Job title or job description . Then  generate a workExperience based on the job description or jobtitle.
  - if the cv is generated based on the previous cv data then use previous cv workExperience data or generate based on the previous cv data.

  - example of the points :
  <ul>
    <li> Tailor work experience based on the job title or job description.</li>
    <li> Use work experience data from the previous CV, or generate it based on the previous data.</li>
    <li> Ensure dates in work experience match those provided in the previous CV.</li>
    <li> Select relevant dates from the previous CV for work experience.</li>
    <li> Understand and handle all date formats in work experience.</li>
    <li> Convert dates to a proper format, e.g., "01/2023 to 06/2023" → "January 2023 - June 2023".</li>
  </ul>

7. **How to generate skills**
  - if the cv is generated based on the Job title or job description . Then  generate a skills based on the job description or jobtitle.
  - if the cv is generated based on the previous cv data then use previous cv skills  or generate based on the previous cv data .

8. **How to generate languages**
  - if the cv is generated based on the Job title or job description . Then  generate a languages based on the job description or jobtitle.
  - if the cv is generated based on the previous cv data then use previous cv languages  or generate based on the previous cv data .

9. **How to generate hobbies**
  - If hobbies are provided in the previous CV data, use them.
  - If no hobbies are provided, infer hobbies based on the job description or job title. For example:
    - For a software developer: coding, gaming, or open-source contributions.
    - For a teacher: reading, writing, or gardening.
  - Always include hobbies in the CV, and ensure they are relevant or general (e.g., traveling, fitness, or photography).

10. **How to generate certifications**
  - if the cv is generated based on the Job title or job description . Then  generate a certifications based on the job description or jobtitle.
  - if the cv is generated based on the previous cv data then use previous cv certifications or generate based on the previous cv data .

11. **when to add customSections**
   - if the cv is generated based on the Both Job title and job descriptionand  Only job title, Only job description then don't include the customSections.
   - if the cv is generated based on the previous cv data then you must include the customSections.customSections have these keys:
   {
            projectName: "" //add the random name don't add the N/A
            startDate: ""
            endDate: ""
            description: "" (HTML structure with <ul> and <li> tags for project features)
          }
    - if previous cv data contain some projects then include the customSections .if dates are not provided then assume the current date as start and end dates. Date format should be in "month year".

   
**How to generate response**
. **Output Structure**: The following is an example of the output format. The output must be structured as follows:
     
{
  "profile": {
    "column": "left",
    "header": "profile",
    "type": "profile",
    "profileImage": "",
    "name": "",  // John Doe
    "contactNumber": "",  //add the random don't add the N/A  +44 1234 567890
    "email": "", // johndoe@email.com
    "address": "",   // add the random don't add the N/A UK
    "jobTitle": "", 
    "links": []  // add the random don't add the N/A 
     visibility: {
               
               
                contactNumber: true,
                email: true,
                address: true,
                
                links: true,
            },
  },
  "summary": {
    "header": "summary",
    "column": "right",
    "type": "about",
    "items": [
      {
        "description": ""
      }
    ]
  },
  "education": {
    "column": "left",
    "header": "education",
    "type": "education",
    "items": [
      {
        "degree": "",  // BSc in Computer Science
        "institution": "", // University of Leeds
        "reference": "",
        "startDate": "", // 2018
        "endDate": "" // 2022 or present
      }
    ]
  },
  "workExperience": {
    "column": "right",
    "header": "Work Experience",
    "type": "workExperience",
    "items": [
      {
        "jobTitle": "", 
        "company": "",
        "startDate": "",
        "endDate": "",
        "description": ""
      }
    ]
  },
  "skills": {
    "column": "left",
    "header": "skills",
    "type": "skills",
    "items": [
      {
        "name": "", // HTML5
        "level": "" // Advanced
      }
    ]
  },
  "certifications": {
    "header": "certifications",
    "type": "certificates",
    "column": "right",
    "items": [
      {
        "title": "",
        "date": "",
        "description": ""
      }
    ]
  }
    "customSections":{
      - header: "Custom Section"
      - type: "customSections"
      - column: "right"
      - items: [
          {
            projectName: ""  // add the random don't add the N/A 
            startDate: "" // add the random don't add the N/A 
            endDate: "" // add the random don't add the N/A 
            description: "" // add the random don't add the N/A  (HTML structure with <ul> and <li> tags for project features)
          }
        ]
    }
         "extension": ${extension}
      
}
  
 


**Output Format**: Ensure the response is valid JSON and formatted exactly as described above, with no additional text or alterations to the key names.

**Compliance**: Follow the rules above rigorously to ensure the generated CV meets user expectations and requirements.

Your task is to take the input data, apply the guidelines above, and return a CV formatted as specified.`

  try {
    // Create the completion with streaming enabled
    const stream = await openaiInstance.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.2, // Dynamically pass temperature
      response_format: { type: "json_object" },
      messages: [
        { 'role': 'system', 'content': system_prompt },
        { 'role': 'user', 'content': prompt }
      ],
      stream: true, // Enable streaming
      stream_options: { include_usage: true } // Include token usage
    });
    // console.log("data stream", stream);
    // console.log("Token Usage:", response.data.usage);
    // console.log("here2");

    // Process the streaming response to receive data as a single string
    const receivedString = await processStream(stream);

    // console.log("Received data:", receivedString);
    // Parse the received string as JSON
    const cvResponse = JSON.parse(receivedString);

    // Now, include the extension flag outside of the CV sections
    const finalResponse = {
      cv: cvResponse, // Wrap CV data in the "cv" key
      extension: extension // Add the "extension" flag outside of the CV object
    };

    return finalResponse;  // Return the CV with the extension flag
  } catch (error) {
    console.error("Error in generateChat in open ai:", error.message);
    throw new Error("Failed to generate chat completion");
  }
};


// desired functions to handle the summary , education , workExperience , skills , languages , references , certifications , hobbies , customSections

exports.generateChatSection = async function (text) {
  // console.log("--------------------------------AI RESUME----------------------------------------");

  try {
    // Create the completion with streaming enabled
    const stream = await openaiInstance.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.2, // Dynamically pass temperature
      response_format: { type: "json_object" },
      messages: [
        { 'role': 'user', 'content': text }
      ],
      stream: true, // Enable streaming
    });

    // console.log("here2");

    // Process the streaming response to receive data as a single string
    const receivedString = await processStream(stream);

    // console.log("Received data:", receivedString);
    return receivedString;
  } catch (error) {
    console.error("Error in generateChat in open ai:", error.message);
    throw new Error("Failed to generate chat completion");
  }
};





// In-memory conversation history array
let conversationHistory = [];

// Function to add a new prompt and AI response to the history
function addToConversationHistory(prompt, receivedString) {
  // Push the new prompt and response to the conversation history
  // console.log("prompt", prompt)
  // console.log("receivedString =====", receivedString)
  conversationHistory.push({ prompt, response: receivedString });

  // If the length exceeds 10, remove the oldest item (first element)
  if (conversationHistory.length > 5) {
    conversationHistory.shift(); // Remove the first element
  }
}

// Function to get the current conversation history formatted for the AI model
function getFormattedConversationHistory() {
  // Build the conversation history in the format required by OpenAI's model
  let formattedHistory = [];

  // console.log("conversationHistory ====", conversationHistory)

  conversationHistory.forEach((entry) => {
    // console.log("entry", entry)
    // Each entry has a 'prompt' and 'response' field, so we append both
    formattedHistory.push({ 'human': entry.prompt });
    formattedHistory.push({ 'AI': entry.response });
  });

  return formattedHistory;
}


exports.generateResumeScore = async function (data, prompt) {
  // console.log("--------------------------------AI RESUME----------------------------------------");
  // Add the new prompt to the conversation history
  addToConversationHistory(prompt, ""); // Initially, we don't have the response yet, so we store an empty response for now

  const system_prompt = `
  You are an expert in analyzing resumes.
  You follow these steps to analyze a resume:

  **Step 1: Understand the Resume.**
    - Here is the data from my Resume in JSON format: ${JSON.stringify(data)}.

  **Step 2: Identify the Areas of Improvement in the Resume.**
    - Please identify any weak sections, missing information, or areas where the resume can be improved. Consider aspects like:
      1. Missing skills, qualifications, or keywords from the job description.
      2. Incomplete or poorly structured sections (like Summary, Experience, etc.).
      3. Unclear or vague descriptions of achievements.
      4. Gaps in work experience or education.
      5. General formatting and readability issues.

    - Ensure check if the section is improved or modified then dont send back again that section information.
    - Provide specific suggestions :
    - Your output should look like this:
    
    {
      "areasOfImprovement": [
        {
          "section": "", //section name there
          "issue": "",
          "suggestion": "" // Suggestion should be start with like  "You may want to include" , "You may want to remove", or "You may want to enhance" or "you may want to add".
        },
        {
          "section": "",
          "issue": "",
          "suggestion": ""
        }
      ]
    }
##IMPRTANT:
  FOR SUGGESTION :Strictly donot provide any suggestions for the **Certifications** I dont need any Suggestion for Certifications. If the section is already present, don't suggest adding it again. If the section is missing, suggest adding it. If the section is present but needs improvement, provide suggestions for enhancement. if the section alredy improved then don't suggest that section again.

  **Step 3: Generate OverallScore by Rating the Resume.**
    Rate the Resume based on the following criteria:
    1. **Qualifications Match or Measurable Results**: How well do the qualifications, skills, and achievements in the resume align with the qualifications required by the target job? Are there measurable results from previous roles?
    2. **Clarity and Readability**: Is the resume easy to read? Is the information logically organized and clear?
    3. **Impact and Achievements**: Are the achievements highlighted in a way that shows impact (quantifiable results)?
    4. Make sure to keep the previous scores and make any necessary adjustments.
    5. make sure to keep the previous data and when the text is changed then the score should be updated and make suer the score increased.
    Please provide:
      - **Overall Score** (out of 100).

  **Step 4: Generate a Review in One Line:**
    - Understand the resume and provide a review summary.
    - Summarize the resume's overall quality, give suggestions for improvement, and explain how well the resume aligns with the target job description in 3-4 lines.

  **Step 5: Generate a Score for Resume Structure:**
    - **Total Resume Structure points**: 25 points
    - Evaluate the resume structure based on the following criteria:
      1. The resume should have a clear title and concise introduction.
      2. The resume should have clear sections for: Summary, Skills, Experience, Education, and Certifications.
      3. The resume should include clear sections for Languages, and Hobbies.

  **Step 6: Generate a Score for Qualifications Match:**
    - **Total Qualifications Match points**: 25 points
    - Evaluate how well the resume aligns with the job description by checking the following:
      1. Does the resume highlight relevant education?
      2. Does the experience section align with the job description?
     

  **Step 7: Generate a Score for Resume Completeness:**
    - **Total Resume Completeness points**: 25 points
    - Evaluate the completeness and grammar of the resume:
      1. Does the resume flow logically and is it easy to understand?
      2. Are all necessary sections complete and well-detailed?

  **Step 8: Generate a Score for Content Redundancy:**
  - **Total Content Redundancy points**: 25 points
  - Evaluate whether the resume contains redundant or repetitive content. Consider whether any sections or skills are unnecessarily repeated or if the same achievements are described multiple times without adding new value.
  
  **Step 9: undertans the previous conversation:**
  - Here is the data from my conversation history in JSON format: ${JSON.stringify(conversationHistory)}.
  - You can use this conversation history to provide context for the AI model when generating responses.
  - This can help the AI model understand the context and provide more accurate responses.
  - The conversation history can be helpful in understanding the context of the user's request and providing more accurate responses.
  
  
  **Step 10 : Generate the Final Response in JSON Format:**
    The response should match the following structure exactly:
    
    {
      "OverallScore": <score>,
      "ReviewInOneLine": "<review summary>",
      "variablesScoreDependsOn": [
        { "ResumeStructure": <score>, "overAllScore": 25 },
        { "QualificationsMatch": <score>, "overAllScore": 25 },
        { "ResumeCompleteness": <score>, "overAllScore": 25 },
        { "ContentRedundancy": <score>, "overAllScore": 25 }
      ],
      "areasOfImprovement": [
        {
          "section": "Summary",
          "issue": "",
          "suggestion": "."
        },
        {
          "section": "Skills",
          "issue": "",
          "suggestion": ""
        }
         
      ]
    }
`;



  try {

    // Send the full conversation history (which includes previous responses) as context for the model
    const conversationContext = getFormattedConversationHistory();
    // console.log("Send the full conversation history", conversationContext)

    // Create the completion with streaming enabled
    const stream = await openaiInstance.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.7, // Dynamically pass temperature
      response_format: { type: "json_object" },
      messages: [
        { 'role': 'system', 'content': system_prompt },
        // ...conversationContext, // Include the entire conversation history
        { 'role': 'user', 'content': prompt }
      ],
      seed: 1,
      stream: true, // Enable streaming
    });

    // console.log("here2");

    // Process the streaming response to receive data as a single string
    const receivedString = await processStream(stream);
    // Update the history with the new response from the AI


    addToConversationHistory(prompt, receivedString);

    // console.log("Update the history with the new response", conversationContext)
    // console.log("Received data:", receivedString);
    return receivedString;
  } catch (error) {
    console.error("Error in generateChat in open ai:", error.message);
    throw new Error("Failed to generate chat completion");
  }
};

exports.generateResumeScoreExtension = async function (data, jobDescription, prompt) {
  // console.log("--------------------------------AI RESUME----------------------------------------");
  // Add the new prompt to the conversation history
  addToConversationHistory(prompt, ""); // Initially, we don't have the response yet, so we store an empty response for now

  const system_prompt = `
  you are expert to analyze a resume.
  you follow step how to analyze a resume.
  step 1 : undertsand the resume.
    -Here is the data from my Resume in JSON format: ${JSON.stringify(data)}.
  step 2 : understand the job description.
    -Here is the job description of the position where I want to apply: 
    "${jobDescription}"

  step 3 :generate OverallScore by Rate the Resume based on the following criteria in relation to the target job description :

    1. **Qualifications Match or Measurable Results**: How well do the qualifications, skills, and achievements in the resume align with the qualifications required by the target job? Are there measurable results for relevant experiences?

    2. **Keyword Match**: Compare the keywords from the job description to those in the resume. How well does the resume incorporate the key skills, tools, and technologies mentioned in the job description?

    3. **Responsibility Match**: Compare the responsibilities listed in the resume with the responsibilities outlined in the target job description. How well does the experience and career level align with the expectations for this role?

    4. **Missing Keywords/Skills**: Identify any important keywords, skills, or technologies from the job description that are not present in the resume. Provide a list of these missing items, along with suggestions on whether the user should **add** them to the resume or **ignore** them.
    
    5. use your knowledge of the target job description to determine the score for each criteria.
      Please provide:

      - **Overall Score** (out of 100).
  step 4 : generate a review in one line:
    - understand the resume  use your knowledge to generate a review.
    - Summarize the Resume's overall quality, give suggestions for improvement, and explain how well the resume aligns with the target job description in 3-4 lines.
  step 5 : generate a job title match comment:
    -For Job Title Match, although it's not factored into the overall score, include a simple comment on whether the job title in the resume closely matches the target job title from the job description.
    - generate a comment for Job Title Match in 1 line.
  step 6: generate a missing keywords comment:
    - For Missing Keywords, include a simple comment on the missing keywords and suggestions for improvement.
    - generate a comment for Missing Keywords in 1 line.
    - Also, provide the **missingKeywords** array, which lists missing skills/keywords and suggestions. The format of the missing keywords should be:
    - "missingKeywords": [
          { "keyword": "Skill Name", "suggestion": "any suggestion" , "reason": "Explain reason as well." }
      ]
  step 7 : generate a score for resume structure:

    - Total Resume Structure points : 25 points
    - check resume structure based on the following criteria:
    1.  The resume should have a clear title and a concise introduction.
    2.  The resume should have a clear section for each of the following: summary, skills, experiences, education, and certifications.
    3.  The resume should have a clear section for each of the following: certifications, languages, and hobbies.
    
  step 8 : generate a score for Qualifications Match :
  
  - Total Qualifications Match points : 25 points
  - check resume structure based on the following criteria:
  1. check resume provided education match with the target job description.
  2. check resume provided experience match with the target job description.
  
  
  step 9 : generate a score for Keyword Match :
  - total Keyword Match points : 25 points
  - check resume provided keywords match with the target job description.
  1. check resume provided keywords match with the target job description.
  
  step 10 : generate a score for Responsibility Match :
    - Total Responsibility Match points : 25 points
    - check resume provided responsibilities match with the target job description.
    1. check resume provided responsibilities match with the target job description.
    
  **Step 11: undertans the previous conversation:**
  - Here is the data from my conversation history in JSON format: ${JSON.stringify(conversationHistory)}.
  - You can use this conversation history to provide context for the AI model when generating responses.
  - This can help the AI model understand the context and provide more accurate responses.
  - The conversation history can be helpful in understanding the context of the user's request and providing more accurate responses.
  


step 12 : generate the final response in JSON format. For example, the response should look like this:
      -The response must match the following structure exactly you must include the following keys and follow exactly the same format as the output. For example, the response should look like this:


        {
            "OverallScore": <score>,
            "ReviewInOneLine": "<review summary>",
            "variablesScoreDependsOn": [
                { "ResumeStructure": <score> ,
                "overAllScore": 25  
                },
                { "QualificationsMatch": <score> ,
                 "overAllScore": 25 
                 },
                { "KeywordMatch": <score>,
                 "overAllScore": 25 
                  },
                { "ResponsibilityMatch": <score> ,
                 "overAllScore": 25 
                 }
            ],
            "JobTitleMatch": "<Job title comment>",
            "missingKeywords": [
                { "keyword": "<Skill Name>", "suggestion": "<Add | Ignore>", "reason": "<reason>" }
            ]
        }`

  try {

    // Send the full conversation history (which includes previous responses) as context for the model
    const conversationContext = getFormattedConversationHistory();
    // console.log("Send the full conversation history", conversationContext)

    // Create the completion with streaming enabled
    const stream = await openaiInstance.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.2, // Dynamically pass temperature
      response_format: { type: "json_object" },
      messages: [
        { 'role': 'system', 'content': system_prompt },
        // ...conversationContext, // Include the entire conversation history
        { 'role': 'user', 'content': prompt }
      ],
      seed: 1,
      stream: true, // Enable streaming
    });

    // console.log("here2");

    // Process the streaming response to receive data as a single string
    const receivedString = await processStream(stream);
    // Update the history with the new response from the AI


    addToConversationHistory(prompt, receivedString);

    // console.log("Update the history with the new response", conversationContext)
    // console.log("Received data:", receivedString);
    return receivedString;
  } catch (error) {
    console.error("Error in generateChat in open ai:", error.message);
    throw new Error("Failed to generate chat completion");
  }
};


exports.generateChatCoverletter = async function ({ prompt, temperature, maxTokens, model }) {
  // console.log("--------------------------------AI RESUME----------------------------------------", prompt, temperature, maxTokens, model);

  try {
    // Create the completion with streaming enabled
    const stream = await openaiInstance.chat.completions.create({
      model: model || "gpt-4o-mini", // Updated to 'gpt-4'
      // response_format: { type: "json_object" },
      messages: [{ role: 'user', content: prompt }],
      temperature: temperature || 0.2, // Dynamically pass temperature
      max_tokens: maxTokens || 1000,
      stream: true, // Enable streaming
    });

    // console.log("here2");

    // Process the streaming response to receive data as a single string
    const receivedString = await processStream(stream);

    // console.log("Received data:", receivedString);
    return receivedString;
  } catch (error) {
    console.error("Error in generateChat:", error.message);
    throw new Error("Failed to generate chat completion");
  }
};


//
exports.generatePdfResumeWithDescription = async function (jobDescription, text) {
  console.log("--------------------------------AI RESUME testing----------------------------------------", jobDescription, text);
  try {

    const stream = await openaiInstance.chat.completions.create({

      "model": "gpt-4o-mini",
      "response_format": { "type": "json_object" },
      "temperature": 0.6,
      "messages": [

        {
          "role": "system",
          "content": `This is my resume data: ${JSON.stringify(text)}.
          First Explain the resume data you to extract the summary or intent of the resume data [text].
          Then you have to create a new resume accordingly to the job description provided below,
          Below is the job description: ${JSON.stringify(jobDescription)}. Use both the resume data and the job description to generate an enhanced resume. If a summary is missing, 
          generate one based on the job description, role, and skills provided. The response must strictly adhere to the given JSON format and use the specified key names without any modifications or additions.
          ##Important: 
Create a CV based on the job description while keeping the existing resume data. In the "About" section, merge the both job description and current CV about section and generate the new about section. In the "Work Experience" section, update the job titles to match those in the job description.


### Guidelines for CV Generation:

1. **Input Variability**: You will receive the user's CV data and a job description:
   
   
   - Ensure all provided details are included and relevant sections are complete.
   - Do not skip any crucial sections or details required for a comprehensive CV.
   - Maintain proper grammar, punctuation, and capitalization throughout.
   - Use all provided skills from the user's CV and include additional skills relevant to the job description.
   - Ensure all dates, formats, and other information are consistent across the resume.
   - Ensure that if the projects sections are added to the resume data then only show it in the resume data in customSections.
   - If the project section are not added in teh resume data then dont add customSections.

2. **How to generate jobTitle**:
   - If the job title is missing or unspecified, derive it based on the job description and CV data. Analyze the job description to infer an appropriate title.
   - If the user's CV data already includes a job title, use it unless the job description provides a more suitable match.

3. **How to generate profile data**:
   - Use the name, email, and contact number from the CV data if available.
   - If any of these details are missing, generate them randomly (e.g., example@example.com, a random phone number, etc.).
   - Include any additional information from the job description that can enhance the profile.

4. **How to generate summary**:
   - Use the job description to craft a tailored summary highlighting the candidate's relevance to the role.
   - If the user's CV includes a summary, enhance it to align with the job description.
   - Ensure the summary is engaging, informative, and specific to the job requirements.
   - If no summary is provided, generate one based on the job description and CV data.
   - Ensure the length and complexity of the summary are appropriate for the job requirements.
   - Ensure the length of summary should be equal or greater than provided summary.

5. **How to generate education**:
   - Use the education details from the user's CV if available, ensuring accurate date formatting (e.g., "01/2023 to 06/2023" should be converted to "January 2023 - June 2023").
   - If the CV data lacks education information, generate relevant entries based on the job description.

6. **How to generate workExperience**:
   - Integrate work experience from the user's CV, aligning it with the role described in the job description.
   - Add any relevant tasks or responsibilities based on the job description.
   - Ensure proper date formatting and consistency across the section.
   - Ensure you must pick all the work experience from the provided cv data.
   - Ensure you never skip any work experience from the provided cv data.
   - Strickly Maintain the following structure
   - Ensure the response is in the < ul > and <li> formate
   - example of the points :
   <ul>
     <li> Tailor work experience based on the job title or job description.</li>
     <li> Use work experience data from the previous CV, or generate it based on the previous data.</li>
     <li> Ensure dates in work experience match those provided in the previous CV.</li>
     <li> Select relevant dates from the previous CV for work experience.</li>
     <li> Understand and handle all date formats in work experience.</li>
     <li> Convert dates to a proper format, e.g., "01/2023 to 06/2023" → "January 2023 - June 2023".</li>
   </ul>

7. **How to generate skills**:
   - Combine skills from the user's CV and those inferred from the job description.
   - Ensure a comprehensive and job-specific skills list.
   - Ensure you don't skip any skills from the provided cv data.

8. **How to generate languages**:
   - Use languages from the user's CV or infer them from the job description.
   - If not specified, include general professional languages (e.g., English).

9. **How to generate hobbies**:
   - Incorporate hobbies provided in the user's CV, if any.
   - If none are available, infer general hobbies based on the job description or role.
   

10. **How to generate certifications**:
   - Use certifications from the user's CV or generate relevant certifications based on the job description.

11. **Custom Sections**:
   - Include a "Projects" section if the user's CV includes project details.
   - If the project section are not added in teh resume data then dont add customSections.
   - If no project dates are provided, assume the current date as the start and end dates.
   - Format descriptions in HTML structure with <ul> and <li> tags.
11. **when to add customSections**
   - if the cv is generated based on the Job title or job description then don't include the customSections.
   - if the cv is generated based on the previous cv data then you must include the customSections.customSections have these keys:
   {
            projectName: "" //add the random name don't add the N/A
            startDate: ""
            endDate: ""
            description: "" (HTML structure with <ul> and <li> tags for project features)
          }
    if previous cv data contain some projects then include the customSections .if dates are not provided then assume the current date as start and end dates. Date format should be in "month year".
   
**How to generate response**
. **Output Structure**: The following is an example of the output format. The output must be structured as follows:

    {
  "profile": {
    "column": "left",
    "header": "profile",
    "type": "profile",
    "profileImage": "",
    "name": "",  // John Doe
    "contactNumber": "",  //add the random don't add the N/A  +44 1234 567890
    "email": "", // johndoe@email.com
    "address": "",   // add the random don't add the N/A  23 Elm Street, Middlesbrough, UK
    "jobTitle": "", 
    "links": []  // add the random don't add the N/A 
     visibility: {
               
                contactNumber: true,
                email: true,
                address: true,
                links: true,
            },
  },
  "summary": {
    "header": "summary",
    "column": "right",
    "type": "about",
    "items": [
      {
        "description": ""
      }
    ]
  },
  "education": {
    "column": "left",
    "header": "education",
    "type": "education",
    "items": [
      {
        "degree": "",  // BSc in Computer Science
        "institution": "", // University of Leeds
        "reference": "",
        "startDate": "", // september 2018
        "endDate": "" //  september 2022 or present
      }
    ]
  },
  "workExperience": {
    "column": "right",
    "header": "Work Experience",
    "type": "workExperience",
    "items": [
      {
        "jobTitle": "", 
        "company": "",
        "startDate": "", // september 2018 
        "endDate": "", //  september 2022 or present
        "description": ""
      }
    ]
  },
  "skills": {
    "column": "left",
    "header": "skills",
    "type": "skills",
    "items": [
      {
        "name": "", // HTML5
        "level": "" // Advanced
      }
    ]
  },
  
  "certifications": {
    "header": "certifications",
    "type": "certificates",
    "column": "right",
    "items": [
      {
        "title": "",
        "date": "",
        "description": ""
      }
    ]
  }
    "customSections":{
      header: "Projects"
      type: "projects"
      column: "right"
      items: [
          {
            projectName: ""  // add the random don't add the N/A 
            description: "" // add the random don't add the N/A  (HTML structure with <ul> and <li> tags for project features)
          }
        ]}
}
      

**Output Format**: Ensure the response is valid JSON and formatted exactly as described above, with no additional text or alterations to the key names.

**Compliance**: Follow the rules above rigorously to ensure the generated CV meets user expectations and requirements.

Your task is to take the input data, apply the guidelines above, and return a CV formatted as specified.`        }
        ,
        {
          "role": "user",
          "content": `Here is my resume data: ${JSON.stringify(text)}. And this is the job description: ${JSON.stringify(jobDescription)}. Use both inputs to create a tailored and enhanced resume. Ensure the output adheres strictly to the specified JSON format .`
        }

      ],
      "stream": true,
      stream_options: { include_usage: true } // Include token usage


    });
    // console.log("Token Usage:", response.data.usage);
    // console.log("stream", stream);
    const receivedString = await processStream(stream);
    // console.log("k", receivedString);
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
    // console.log("Chunk received:", chunk); // Logging each chunk for debugging

    if (chunk.choices && chunk.choices.length > 0) {
      // Collect the content of each chunk
      receivedData += chunk.choices[0].delta?.content || '';
    }
    if (chunk.usage) {
      // console.log("Token Usage (from stream metadata):", chunk.usage);
    }
  }

  return receivedData;
}




// const OpenAI = require('openai');


// const apiKey = process.env.OPENAI_API_KEY;
// // console.log(GPT_API_KEY)

// // Create an instance of OpenAI using your key
// const openaiInstance = new OpenAI({
//     apiKey: apiKey,
// });



// exports.generateChat = async function (text) {
//     console.log("--------------------------------AI RESUME----------------------------------------");
//     const stream = await openaiInstance.chat.completions.create({
//         model: 'gpt-4o',
//         response_format: { type: "json_object" },
//         messages: [{ role: 'user', content: text }],
//         stream: true,
//     });
//     console.log("here2");

//     // Process and receive data as a single string
//     const receivedString = await processStream(stream);
//     // console.log("Received data:", receivedString);
//     return receivedString;
// }

// async function processStream(stream) {
//     let receivedData = '';

//     for await (const chunk of stream) {
//         if (chunk.object === 'chat.completion.chunk') {
//             receivedData += chunk.choices[0].delta.content;
//         }
//     }

//     return receivedData;
// }