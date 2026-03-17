const ResumeModel = require("../../models/UserResume");
const resumeGeneration = require("./OpenAi");
const pdfResumeGeneration = require("./OpenAiPdf");
// const fixNewGenerateChat = require("./functionalities/fixNew")
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const { db } = require("../config");

const { generatePdfResumeWithDescription } = require("./OpenAi")



exports.generateSummary = async (req, res) => {
    const data = req.body;
    // console.log(req.body)
    // Create a concise prompt to generate a summary based on the data provided
    const prompt = `Here are some personal details: ${JSON.stringify(data)}.
    Generate a concise summary for my resume, between 50 and 60 words. The response should be in JSON format with a key 'summary' containing the text.`

    // console.log("Generated Prompt:", prompt);

    try {
        // Assuming you have a service or function (resumeGeneration.generateChat) that interacts with OpenAI or a similar API
        const generatedResponse = await resumeGeneration.generateChatSection(prompt);

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

// exports.generateJobDescription = async (req, res) => {
//     const data = req.body;
//     console.log("body Data", data);
//     //     let prompt = `Here is the job description of position where I want to apply; "${data.jobDescription}".
//     // job description ended here. My Name is ${data.name}. My role is ${data.role}. My address is ${data.address}. Zip Code is ${data.zipCode}. My email is ${data.email}. My phone Number is ${data.phone}. I graduated from ${data.universityName} in ${data.graduatingYear} with major in ${data.major}. My Skills are ${data.skills}. I have certificate in ${data.certificates}. I know ${data.languages}. My linkedin is ${data.linkedin}. Make a cv for me tailored for the above provided job description. Include name, phone, email, linkedin, role, summary, experience(array) template, education(array), skills(array), certificates, langauges(array) and whatever relavant sections according to job description. It should be ready to submit without any edit. Result should be in JSON format so that I can put the data in CV template. Required keys are name, address, email, phone, linkedin, role, summary, languages(array) with default value english and urdu, education(array) with default value of empty array, experience(array) with default value of empty array, skills(array) with default value of empty array. Also add other suitable keys. Your response should be only json nothing else.`
//     let prompt = `${JSON.stringify(data)}
//     Above is the job title. Generate a job description of max 200 words for this job title.`;
//     console.log(prompt);


//     try {
//         const generatedResume = await resumeGeneration.generateChat(prompt);
//         const stringResume = generatedResume.split("undefined")[0];
//         console.log(stringResume);
//         // console.log(JSON.parse(stringResume));
//         res.json({ jobDescription: stringResume });
//     } catch (e) {
//         console.log(e.message);
//         res.json({ "message": e.message });
//     }

// }

exports.generateWorkExperienceDetails = async (req, res) => {
    const { prompt } = req.body;

    // Create a concise prompt to generate work experience details based on user-provided prompt
    const aiPrompt = `
    I have described my role in a job as follows: "${prompt}".
    Please generate key points for the work experience section of my resume. The response should be in JSON format with a key 'workExperience' and include:
    - A summary of my role (1-2 sentences)
    - A few bullet points (3-4) outlining key responsibilities and achievements, based on the information I provided.
    `;

    // console.log("Generated Work Experience Prompt:", aiPrompt);

    try {
        // Assuming you have a service or function (resumeGeneration.generateChat) that interacts with OpenAI or a similar API
        const generatedResponse = await resumeGeneration.generateChatSection(aiPrompt);

        // Ensure that the response contains valid JSON, parsing it
        const jsonResponse = JSON.parse(generatedResponse);

        // Log the parsed response for debugging
        // console.log("Parsed Work Experience Details:", jsonResponse);

        // Send the JSON response to the client
        res.json(jsonResponse);

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error generating work experience details:", error.message);

        // Send the error message back to the client in JSON format
        res.status(500).json({ "message": error.message });
    }
};


exports.generateSkills = async (req, res) => {
    console.log(req.body)
    const { resume } = req.body.requestData; // Expect the full resume in the request body
    console.log("Resume Data:", resume);

    if (!resume) {
        return res.status(400).json({ message: "Resume data is required." });
    }

    // Construct a prompt to ask for skills in an array of objects format
    let prompt = `Based on the following resume data, generate a list of relevant skills. 
    Each skill should be represented as an object with the keys "name" (string) and "level" (string). 
    The level should be one of: Beginner, Intermediate, Advanced, or Expert. 
    Provide the response as a JSON object with a key "skills" containing an array of skill objects.

    Resume Data:
    ${JSON.stringify(resume, null, 2)}

    Your response should be in this format:
    {
      "skills": [
        { "name": "Skill1", "level": "Advanced" },
        { "name": "Skill2", "level": "Expert" }
      ]
    }
    `;

    try {
        // Call the AI generation function with the prompt
        const generatedSkills = await resumeGeneration.generateChatSection(prompt);

        // Parse the AI's response to ensure it is valid JSON
        const stringSkills = generatedSkills.split("undefined")[0];
        const parsedSkills = JSON.parse(stringSkills);

        // Ensure the response includes the expected "skills" key
        if (!parsedSkills.skills || !Array.isArray(parsedSkills.skills)) {
            return res.status(500).json({ message: "AI response is invalid or missing 'skills' key." });
        }

        res.json(parsedSkills); // Return the parsed skills response
    } catch (e) {
        console.error("Error generating skills:", e.message);
        res.status(500).json({ message: e.message });
    }
};


exports.generateJobResponsibilities = async (req, res) => {
    const data = req.body;
    // console.log("body Data", data);
    //     let prompt = `Here is the job description of position where I want to apply; "${data.jobDescription}".
    //  Each point must include a bullet point.
    // job description ended here. My Name is ${data.name}. My role is ${data.role}. My address is ${data.address}. Zip Code is ${data.zipCode}. My email is ${data.email}. My phone Number is ${data.phone}. I graduated from ${data.universityName} in ${data.graduatingYear} with major in ${data.major}. My Skills are ${data.skills}. I have certificate in ${data.certificates}. I know ${data.languages}. My linkedin is ${data.linkedin}. Make a cv for me tailored for the above provided job description. Include name, phone, email, linkedin, role, summary, experience(array) template, education(array), skills(array), certificates, langauges(array) and whatever relavant sections according to job description. It should be ready to submit without any edit. Result should be in JSON format so that I can put the data in CV template. Required keys are name, address, email, phone, linkedin, role, summary, languages(array) with default value english and urdu, education(array) with default value of empty array, experience(array) with default value of empty array, skills(array) with default value of empty array. Also add other suitable keys. Your response should be only json nothing else.`
    let prompt = `${JSON.stringify(data)}
    Above is some details. Generate some job responsibilities related to the provided information for my resume.
     You must also generate new responsibilities as well but within the provided domain.
       The response should be in JSON format inside a key description.
        In value, each point should be wrapped in an HTML element  < li >  <li>  (without a bullet point) and the parent tag < ul >. Max number of points is 5`;
    // Above is some details. Generate some job resposibilities related to provided information for my resume. You must also generate new responsibilities as well but within the provided domain. It should be in concise points. The response should be in json format inside a key description. In value, each point should be for wrapped in html element <li> with the parent tag <ul>. Max number of points is 6`;
    // console.log(prompt);

    try {
        const generatedResume = await resumeGeneration.generateChatSection(prompt);
        const stringResume = generatedResume?.split("undefined")[0];
        // console.log(stringResume);
        // console.log(JSON.parse(stringResume));
        res.json(JSON.parse(stringResume));
    } catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }

}

exports.generateProjectResponsibilities = async (req, res) => {
    const data = req.body;
    // console.log("body Data", data);
    //     let prompt = `Here is the job description of position where I want to apply; "${data.jobDescription}".
    // job description ended here. My Name is ${data.name}. My role is ${data.role}. My address is ${data.address}. Zip Code is ${data.zipCode}. My email is ${data.email}. My phone Number is ${data.phone}. I graduated from ${data.universityName} in ${data.graduatingYear} with major in ${data.major}. My Skills are ${data.skills}. I have certificate in ${data.certificates}. I know ${data.languages}. My linkedin is ${data.linkedin}. Make a cv for me tailored for the above provided job description. Include name, phone, email, linkedin, role, summary, experience(array) template, education(array), skills(array), certificates, langauges(array) and whatever relavant sections according to job description. It should be ready to submit without any edit. Result should be in JSON format so that I can put the data in CV template. Required keys are name, address, email, phone, linkedin, role, summary, languages(array) with default value english and urdu, education(array) with default value of empty array, experience(array) with default value of empty array, skills(array) with default value of empty array. Also add other suitable keys. Your response should be only json nothing else.`
    let prompt = `${JSON.stringify(data)}
    Above is some project details. Generate some project features related to provided information for my resume. You must also generate new features as well but within the provided domain. It should be in concise points. The response should be in json format inside a key description. In value, each point should be for wrapped in html element <li> with the parent tag <ul>. Max number of points is 6`;
    // console.log(prompt);


    try {
        const generatedResume = await resumeGeneration.generateChat(prompt);
        const stringResume = generatedResume?.split("undefined")[0];
        // console.log(stringResume);
        // console.log(JSON.parse(stringResume));
        res.json(JSON.parse(stringResume));
    } catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }

}

// exports.generateCoverLetter = async (req, res) => {
//     const data = req.body;
//     // console.log("body Data", data);
//     //     let prompt = `Here is the job description of position where I want to apply; "${data.jobDescription}".
//     // job description ended here. My Name is ${data.name}. My role is ${data.role}. My address is ${data.address}. Zip Code is ${data.zipCode}. My email is ${data.email}. My phone Number is ${data.phone}. I graduated from ${data.universityName} in ${data.graduatingYear} with major in ${data.major}. My Skills are ${data.skills}. I have certificate in ${data.certificates}. I know ${data.languages}. My linkedin is ${data.linkedin}. Make a cv for me tailored for the above provided job description. Include name, phone, email, linkedin, role, summary, experience(array) template, education(array), skills(array), certificates, langauges(array) and whatever relavant sections according to job description. It should be ready to submit without any edit. Result should be in JSON format so that I can put the data in CV template. Required keys are name, address, email, phone, linkedin, role, summary, languages(array) with default value english and urdu, education(array) with default value of empty array, experience(array) with default value of empty array, skills(array) with default value of empty array. Also add other suitable keys. Your response should be only json nothing else.`
//     let prompt = `${JSON.stringify(data.jobTitle)}
//     Above is my job Title. ${data.jobDescription ? `${JSON.stringify(data.jobDescription)} This is my job description.` : ""} Generate cover letter for it according to job title and job description. The response should be formatted. For new line use escape sequences. Add newline escape sequence after Dear Hiring Manager, . Also, you must separate every paragraph with newline escape sequence as well to add a line break after each paragraph. Only use newline escape sequence for new lines. The response should be a string with generated cover letter with escape sequences for new lines`;
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

exports.generateResumeScore = async (req, res) => {
    const data = req.body;
    // console.log("body Data", data);
    //     let prompt = `Here is the job description of position where I want to apply; "${data.jobDescription}".
    // job description ended here. My Name is ${data.name}. My role is ${data.role}. My address is ${data.address}. Zip Code is ${data.zipCode}. My email is ${data.email}. My phone Number is ${data.phone}. I graduated from ${data.universityName} in ${data.graduatingYear} with major in ${data.major}. My Skills are ${data.skills}. I have certificate in ${data.certificates}. I know ${data.languages}. My linkedin is ${data.linkedin}. Make a cv for me tailored for the above provided job description. Include name, phone, email, linkedin, role, summary, experience(array) template, education(array), skills(array), certificates, langauges(array) and whatever relavant sections according to job description. It should be ready to submit without any edit. Result should be in JSON format so that I can put the data in CV template. Required keys are name, address, email, phone, linkedin, role, summary, languages(array) with default value english and urdu, education(array) with default value of empty array, experience(array) with default value of empty array, skills(array) with default value of empty array. Also add other suitable keys. Your response should be only json nothing else.`
    // - **Detailed Analysis**: Highlight the **good aspects** and **areas for improvement** in each section (Profile, Summary, Work Experience, Skills, Education, Certifications, Custom Sections, etc.). and make sure its in teh form of object
    // - **Personalized Suggestions**: For areas needing improvement, provide specific suggestions on what can be added, removed, or enhanced to make the Resume stronger.
    // Construct the prompt
    const prompt = `
Here is the data from my Resume in JSON format: ${JSON.stringify(data)}.

Please rate the Resume from 1 to 100 based on the following detailed criteria:
- **Relevance of Data to the Profession**: Does the Resume include content relevant to the job or profession, and how well does it align with industry standards? 
- **Clarity and Readability**: Does the Resume flow logically, and is the information clear and easy to understand?
- **Work Experience**: Is the work experience section comprehensive, detailing key responsibilities, achievements, and skills gained from each role? Is the work experience relevant to the profession?
- **Skills Section**: Are the listed skills relevant to the job or profession, and are they organized and described well?
- **Completeness**: Are all necessary sections (profile, work experience, skills, education, etc.) present and sufficiently detailed? 
Please provide:
- **Overall Score** (out of 100).
- **Review in One Line**: Summarize the Resume's overall quality ,  Give suggestion to imporve it and relevance in a detail 3-4 lines.
- **How to give suggestion** : ensure to improve the user's understanding in the resume review. Provide a clear and actionable plan for improvement, including specific suggestions for what to add, remove,  from the resume review and provide a clear and actionable plan for improvement . if overall score is greater than 80 then dont give the suggestions to the user and return {suggestion:""}   

Ensure if the section is improved or modified then dont send back again that section information.
Ensure that the **variablesScoreDependsOn** must provide this section and section is returned in the following structure:
this must be in array formate:

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
          "section": "", // mentioned section here
          "issue": "", // issue taht has to be improved
          "suggestion": "" // suggested improvement
        },
         
         
      ]
    }
Subtract points if the relevant information is missing or incomplete, and provide feedback in a constructive tone.
`;
    try {
        const generatedResume = await resumeGeneration.generateResumeScore(data, prompt);
        const stringResume = generatedResume?.split("undefined")[0];
        // console.log(stringResume);
        // console.log(JSON.parse(stringResume));
        res.json(JSON.parse(stringResume));
    } catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }

}

exports.generateResumeScoreFromExtension = async (req, res) => {
    console.log("req.body extension resuem score ", req.body)
    // const { data.resume, jobDescription } = req.body; // Extract resume and job description from the request

    const data = req.body?.data?.resume
    const jobDescription = req.body?.data?.extension?.description
    const jobTitle = req.body?.data?.extension?.jobTitle
    // Construct the prompt with both resume data and job description
    const prompt = `
    Here is the data from my Resume in JSON format: ${JSON.stringify(data)}.

Here is the job description of the position where I want to apply: 
"${jobDescription}"


For **Job Title Match**, although it's not factored into the overall score, include a simple comment on whether the job title in the resume closely matches the target job title from the job description.

The response must match the following structure exactly:


    {
        "OverallScore": <score>,
        "ReviewInOneLine": "<review summary>",
        "variablesScoreDependsOn": [
            { "ResumeStructure": <score> },
            { "QualificationsMatch": <score> },
            { "KeywordMatch": <score> },
            { "ResponsibilityMatch": <score> }
        ],
        "JobTitleMatch": "<Job title comment>",
        "missingKeywords": [
            { "keyword": "<Skill Name>", "suggestion": "<Add | Ignore>", "reason": "<reason>" }
        ]
    }

`;



    try {
        const generatedResume = await resumeGeneration.generateResumeScoreExtension(data, jobDescription, prompt);
        const stringResume = generatedResume?.split("undefined")[0];

        const parsedResume = JSON.parse(stringResume);
        console.log("parsedResume extension score ", parsedResume);
        res.json({
            score: parsedResume,
            // missingKeywords: parsedResume.missingKeywords || [],
        });

    } catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }
}



exports.generateResumeOnJobDescription = async (req, res) => {
    const data = req.body;

    // Job description and title from the incoming request
    const jobTitle = data.jobTitle;
    const jobDescription = data.description || 'No description provided';

    // Construct the prompt to generate a CV based on the provided job title and description
    //     const prompt = `
    //   {
    //     "messages": [
    //       {
    //         "role": "user",
    //         "content": "This is my resume data: {jobTitle: ${jobTitle}, jobDescription: ${jobDescription}}. Enhance the resume using the same personal information, and if a summary is missing, generate one based on the ${jobTitle} . The response should be formatted in a JSON structure are :

    // 1. **Profile**:
    // - column: 'left'
    //    - header: 'profile'
    //    - type: 'profile'
    //    - profileImage: '' (default empty string)
    //    - name: 'John Doe'
    //    - contactNumber: '+44 1234 567890'
    //    - email: 'johndoe@email.com'
    //    - address: '123 Elm Street, Middlesbrough, UK'
    //    - jobTitle: '${jobTitle}'
    //    - links: [] (Array of portfolio or LinkedIn URLs)

    // 2. **Summary**:
    //    - header: 'summary'
    //    - column: 'right'
    //    - type: 'about'
    //    - items: [
    //        {
    //          description: '' (Enhance this with a concise summary based on job responsibilities and requirements)
    //        }
    //      ]

    // 3. **Education**:
    // - column: 'left'
    //    - header: 'education'
    //    - type: 'education'
    //    - items: [
    //        {
    //          degree: 'BSc in Computer Science'
    //          institution: 'University of Leeds'
    //          reference: ''
    //          startDate: '2014'
    //          endDate: '2018'
    //        }
    //      ]

    // 4. **Work Experience**:
    // - column: 'right'
    //    - header: 'Work Experience'
    //    - type: 'workExperience'
    //    - items: [
    //        {
    //          jobTitle: '${jobTitle}'
    //          company: 'Imperial Recruitment Group'
    //          startDate: 'June 2020'
    //          endDate: 'Present'
    //          description: '<ul><li>Develop bespoke websites for various industries including eCommerce platforms.</li><li>Build and maintain WordPress sites with custom themes and functionality.</li><li>Transition WordPress sites to Shopify and manage client projects independently.</li></ul>'
    //        }
    //      ]

    // 5. **Skills**:
    // - column: 'left'
    //    - header: 'skills'
    //    - type: 'skills'
    //    - items: [
    //          { name: 'HTML5', level: 'Advanced' },
    //           based on the jobtitle and description generate the skills related to the jobtitle

    //        ]

    // 6. **Languages**:
    // - column: 'left'
    //    - header: 'languages'
    //    - type: 'languages'
    //    - items: [
    //          { name: 'English', proficiency: 'Fluent' },

    //        ]



    // 7. **Hobbies**:
    // - column: 'right'
    //    - header: 'hobbies'
    //    - type: 'hobbies'
    //    - items: [
    //          { name: 'Photography' },
    //          { name: 'Coding Challenges' }
    //        ]



    // Make sure all existing workExperience, education, and projects are included and do not duplicate sections. If a section is missing, create a placeholder with default values. The response should be in **complete JSON** format as described above."
    //       }
    //     ]
    //   }
    //   `;

    const prompt = `

         This is my resume data: {jobTitle: ${jobTitle}, jobDescription: ${jobDescription}}. Enhance the resume using the same personal information, and if a summary is missing, generate one based on the ${jobTitle} . The response should be formatted in a JSON structure are :        
{
  "profile": {
    "column": "left",
    "header": "profile",
    "type": "profile",
    "profileImage": "",
    "name": "John Doe",
    "contactNumber": "+44 1234 567890",
    "email": "johndoe@email.com",
    "address": "123 Elm Street, Middlesbrough, UK",
    "jobTitle": "${jobTitle}", 
    "links": []
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
        "degree": "BSc in Computer Science",
        "institution": "University of Leeds",
        "reference": "",
        "startDate": "2014",
        "endDate": "2018"
      }
    ]
  },
  "workExperience": {
    "column": "right",
    "header": "Work Experience",
    "type": "workExperience",
    "items": [
      {
        "jobTitle": "${jobTitle}", 
        "company": "Imperial Recruitment Group",
        "startDate": "June 2020",
        "endDate": "Present",
        "description": "<ul><li>Develop bespoke websites for various industries including eCommerce platforms.</li><li>Build and maintain WordPress sites with custom themes and functionality.</li><li>Transition WordPress sites to Shopify and manage client projects independently.</li></ul>"
      }
    ]
  },
  "skills": {
    "column": "left",
    "header": "skills",
    "type": "skills",
    "items": [
      {
        "name": "HTML5",
        "level": "Advanced"
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
}

        Make sure if jobTitle is undefined or null use the jobTitle from the jobDescription.
        Make sure all existing workExperience, education, and projects are included and do not duplicate sections. If a section is missing, create a placeholder with default values. The response should be in **complete JSON** format as described above.


  
  `;
    try {
        // Call the resume generation service (assuming you have a service like OpenAI or another API to process the prompt)
        const generatedResume = await resumeGeneration.generateChat({ jobDescription, jobTitle, prompt });

        // Ensure we remove any unwanted strings or undefined parts
        // const cleanResume = generatedResume?.split("undefined")[0];
        // console.log("generatedResume", generatedResume)
        res.json(generatedResume);
        // res.json({ jobDescription: cleanResume });
    } catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }
};


exports.generateResumeReview = async (req, res) => {
    const data = req.body;
    // console.log("body Data", data);
    //     let prompt = `Here is the job description of position where I want to apply; "${data.jobDescription}".
    // job description ended here. My Name is ${data.name}. My role is ${data.role}. My address is ${data.address}. Zip Code is ${data.zipCode}. My email is ${data.email}. My phone Number is ${data.phone}. I graduated from ${data.universityName} in ${data.graduatingYear} with major in ${data.major}. My Skills are ${data.skills}. I have certificate in ${data.certificates}. I know ${data.languages}. My linkedin is ${data.linkedin}. Make a cv for me tailored for the above provided job description. Include name, phone, email, linkedin, role, summary, experience(array) template, education(array), skills(array), certificates, langauges(array) and whatever relavant sections according to job description. It should be ready to submit without any edit. Result should be in JSON format so that I can put the data in CV template. Required keys are name, address, email, phone, linkedin, role, summary, languages(array) with default value english and urdu, education(array) with default value of empty array, experience(array) with default value of empty array, skills(array) with default value of empty array. Also add other suitable keys. Your response should be only json nothing else.`
    let prompt = `${JSON.stringify(data)}

    Above is my cv data. Give suggestion to imporve it. The response should be in JSON with key review which consists of array of string. Each suggestion is the array element.`;
    // console.log(prompt);


    try {
        const generatedResume = await resumeGeneration.generateChat(prompt);
        const stringResume = generatedResume?.split("undefined")[0];
        // console.log(stringResume);
        // console.log(JSON.parse(stringResume));
        res.json(JSON.parse(stringResume));
    } catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }

}
exports.pdfResume = async (req, res) => {
    // console.log(req.files);
    const { cv } = req.files;
    try {
        // cv.mv(path.join(assetsFolder, cv.name));
        const mimeType = cv.mimetype;
        console.log("mimeType =====", mimeType)
        // res.status(200).json({ "message": "ok" })
        // const pdfPath = './SherazCV.pdf';
        // console.log(pdfPath);
        const generatedPdfResume = await pdfResumeGeneration.pdfGenerateChat(cv.data, mimeType);
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

exports.fixNewResume = async (req, res) => {
    const { cv } = req.files;
    const data = req.body;
    // console.log("cv Data", cv);
    // console.log("body Data", data);
    try {
        // console.log(cv)
        // cv.mv(path.join(assetsFolder, cv.name));

        // res.status(200).json({ "message": "ok" })
        // const pdfPath = './SherazCV.pdf';
        // console.log(pdfPath);
        const generatedPdfResume = await fixNewGenerateChat.fixNewGenerateChat(cv.data, data);
        // console.log(generatedPdfResume);
        const stringResume = generatedPdfResume?.split("undefined")[0];
        res.json(JSON.parse(stringResume));
    }
    catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }

}

exports.createCheckoutSession = async (req, res) => {
    const data = req.body;
    // console.log(data);
    // res.json({ message: "ok" });
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: data.name
                    },
                    unit_amount: (Number(data.price) * 100),

                },
                quantity: 1
            },
        ],
        mode: 'payment',
        success_url: `https://app.resumifi.com/success`,
        cancel_url: `https://app.resumifi.com/cancel`,
    });
    const docRef = doc(db, "users", data.userId);
    const docSnap = await getDoc(docRef);
    const subscriptionDate = new Date();
    let expiryDate = new Date();
    if (data.name == "Monthly Package") {
        expiryDate.setMonth(expiryDate.getMonth() + 1)
    }
    else if (data.name == "Quarterly Package") {
        expiryDate.setMonth(expiryDate.getMonth() + 4)
    }
    if (data.name == "Yearly Package") {
        expiryDate.setMonth(expiryDate.getMonth() + 12)
    }

    if (docSnap.exists()) {
        // console.log("Document data gs:", docSnap.data());
        await updateDoc(docRef, {
            stripeSessionId: session.id,
            subscriptionDate: String(subscriptionDate),
            subscriptionName: data.name,
            subsciptionExpiry: expiryDate
        });
        // console.log("Data updated")
        // redirect("/dashboard")
    };
    // const sessionData = await stripe.checkout.sessions.retrieve(
    //     session.id
    // );
    // console.log("Session Details", sessionData)

    // console.log(session);
    res.json({ id: session.id })

}

exports.getSessionInfo = async (req, res) => {
    const data = req.body;
    // console.log(data);
    const session = await stripe.checkout.sessions.retrieve(
        data.sessionId
    );

    // console.log(session);
    res.json({ sessionDetails: session })

}



exports.getjobsIndeed = async (req, res) => {
    try {
        const { jobUrl } = req.body; // Get the URL from frontend
        if (!jobUrl) {
            return res.status(400).json({ error: 'Job URL is required.' });
        }

        // Parse URL to get the query parameters or keyword from the URL (if applicable)
        const parsedUrl = url.parse(jobUrl, true);

        // Example: extracting location and keyword from parsed URL
        const keyword = parsedUrl.query.q || 'software engineer'; // Default if not found
        const location = parsedUrl.query.l || 'California';       // Default if not found

        // Build the RapidAPI request
        const options = {
            method: 'GET',
            url: 'https://indeed-jobs-api.p.rapidapi.com/indeed-us/',
            params: {
                offset: '0',
                keyword: keyword,
                location: location
            },
            headers: {
                'x-rapidapi-key': '6259aacfe6msh79325b0dec8aa1ep1cf779jsnb6795aa2fe8f',
                'x-rapidapi-host': 'indeed-jobs-api.p.rapidapi.com'
            }
        };

        // Fetch jobs from the API
        const response = await axios.request(options);
        // console.log(response.data)
        return res.json(response.data);

    } catch (error) {
        console.error('Error fetching Indeed Jobs:', error);
        res.status(500).json({ error: 'An error occurred while fetching jobs.' });
    }
}


exports.generateAiResume = async (req, res) => {
    const { firstName, lastName, jobTitle, email, contact, city, country } = req?.body?.formData;

    console.log("Received Data:", { firstName, lastName, jobTitle, email, contact, city, country });
    const resumeData = {
        name: `${firstName} ${lastName}`,
        jobTitle: jobTitle,
        email: email,
        contactNumber: contact || "",
        city: city,
        country: country
        // address: address || "",

    };

    let prompt = `This is my resume data: ${JSON.stringify(resumeData)}.

Please enhance this resume using the existing personal information and format it in JSON with the following structured sections. If any section is missing from the resume data, Generate it on the basis of jobTitle: ${jobTitle}. Also, if a summary is missing, generate one using the jobTitle: ${jobTitle} .

**Ensure the response includes all sections as described below**:
    {
        "profile": {
            "header": "profile",
                "type": "profile",
                    "profileImage": "",
                        "name": "",                // Full name from the resume
                            "contactNumber": "",       // Contact number from the resume
                                "email": "",               // Email from the resume
                                    "address": "",             // Address from the resume
                                        "jobTitle": "",            // Job title from the resume
                                            "links": [],                // Portfolio or LinkedIn URLs as an array
                                            "column": "left"
        },
        "summary": {
            "header": "summary",
                "type": "about",
                    "items": [
                        {
                            "description": ""     // Existing summary or generated based on jobTitle and skills
                        }
                    ],
                        "column": "right"
        },
        "education": {
            "header": "education", 
                "type": "education",
                    "column": "left",
                        "items": [
                            {
                                "degree": "Degree",    // Degree name from the resume or generated based on jobTitle
                                "institution": "Institution",  // School name from the resume or generated based on jobTitle
                                "reference": "",
                                "startDate": "",       // Start date of the degree  from the resume or generated based on jobTitle which should be three years smaller than current date

                                "endDate": ""          // pick it according to start date
                            }
                        ]
        },
        "workExperience": {
            "header": "Work Experience",
                "type": "workExperience",
                    "column": "right",
                        "items": [
                            {
                                "jobTitle": "",         // Job title from the resume
                                "company": "",          // Company name from the resume
                                "startDate": "",        // Start date of the job
                                "endDate": "",          // End date of the job
                                "description": "<ul><li></li></ul>"   // HTML structure with <ul> and <li> tags for responsibilities
                            }
                        ]
        },
        "skills": {
            "header": "skills",
                "type": "skills",
                    "column": "left",
                        "items": [
                            {
                                "name": "",             // Skill name from the resume
                                "level": "Advanced"     // Proficiency level, e.g., Advanced
                            }
                        ]
        },
        
        
        "certifications": {
            "header": "certifications",
                "type": "certificates",
                    "column": "right",
                        "items": [
                            {
                                "title": "",            // Name of the certificate
                                "date": "",             // Date awarded, e.g., Oct 2023
                                "description": ""       // Optional details
                            }
                        ]
        },
        
        "customSections": {
            "header": "Custom Section",
                "type": "customSections",
                    "column": "right",
                        "items": [
                            {
                                "projectName": "",      // Project name
                                "startDate": "",        // Project start date
                                "endDate": "",          // Project end date
                                "description": "<ul><li></li></ul>"   // HTML structure with <ul> and <li> tags for project features
                            }
                        ]
        }
    }

        Note:

        Include all existing work experience, education from the resume data without duplicates.
        If a section is missing in the resume data, add a placeholder with default values, following the structure outlined above.
        The response should be a complete JSON with all sections as described.`



    try {
        const generatedResume = await resumeGeneration.generateChat({ contactNumber: resumeData.contactNumber, email: resumeData.email, jobTitle: resumeData.jobTitle, name: resumeData.name, city: resumeData.city, country: resumeData.country, prompt });
        // const stringResume = generatedResume.split("undefined")[0];
        // console.log(stringResume);
        // console.log(JSON.parse(stringResume));
        res.json(generatedResume)
    } catch (e) {
        console.log("error in feature", e.message);
        res.json({ "message": e.message });
    }
};


exports.generateCustomTitle = async (req, res) => {
    const data = req.body;
    console.log("body Data", data);
    let prompt = `${JSON.stringify(data)}
    Generate a customTitle section. Write a brief customTitle (1-2 sentences) explaining the significance of this ${JSON.stringify(data)}, linking it to the applicant's strengths relevant to the job. response must be in the json format and must follow the structure below:
    
    {
  customTitle: "",
  description: ""
}
    `;
    console.log(prompt);


    try {
        const generatedResume = await resumeGeneration.generateChatSection(prompt);
        const stringResume = generatedResume?.split("undefined")[0];
        console.log(stringResume);
        const parsedResume = JSON.parse(stringResume);
        console.log("===================", JSON.parse(stringResume));
        res.json({ customTitle: parsedResume.description });
    } catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }

}

exports.generateTrainingCourses = async (req, res) => {
    const data = req.body;
    console.log("body Data", data);
    let prompt = `${JSON.stringify(data)}
    Generate details for a training/course section. Provide a brief must use this as a key:courseOverview in (1-2 sentences) ,make all this in the paragraph formate not in the seperate headings or objects. emphasizing skills gained or relevant knowledge acquired that aligns with the job role. response should be in json format`;
    console.log(prompt);


    try {
        const generatedResume = await resumeGeneration.generateChatSection(prompt);
        const stringResume = generatedResume?.split("undefined")[0];
        console.log(stringResume);
        const parsedResume = JSON.parse(stringResume);
        // console.log(JSON.parse(stringResume));
        res.json({ trainingCourse: parsedResume.courseOverview });
    } catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }

}


exports.generateProjects = async (req, res) => {
    const data = req.body;
    // console.log("body Data", data);
    let prompt = `${JSON.stringify(data)}
    Generate a project description. 
    Describe this projectDescription in 1-2 sentences, especially if they relate to the skills required for the job.

    - *Important & Strict* Each point should be wrapped in an HTML element  < li >  (without a bullet point) and the parent tag < ul >. Max number of points is 6.
    - Must be wrapped in an HTML element < li > and the parent tag < ul >. Max number of points is 6.
    - Ensure to added the description there just dont spread multiple ehading just 1 heading and the response shold be in the <li> (without a bullet point).

     response should be in the json format 

     Example your response should be in this formate : 

{
    "projects": "<ul><li> </li></ul>"
}

     
     `;
    // console.log(prompt);

    try {
        const generatedResume = await resumeGeneration.generateChatSection(prompt);
        const stringResume = generatedResume?.split("undefined")[0];
        // console.log(stringResume);
        const parsedResume = JSON.parse(stringResume);
        // console.log("parsedResume==============", parsedResume);
        res.json({ projects: parsedResume.projects });
    } catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }

}


exports.generateStrengths = async (req, res) => {
    const data = req.body;
    console.log("body Data", data);

    let prompt = `${JSON.stringify(data)}
    Generate a strength section. Explain this strength in 1-2 sentences, generate the description just not in the array of objects its just object using specific examples if possible, to illustrate how this quality will benefit them in the desired position. response should be in the json format`;
    console.log(prompt);


    try {
        const generatedResume = await resumeGeneration.generateChatSection(prompt);
        const stringResume = generatedResume?.split("undefined")[0];
        console.log(stringResume);
        const parsedResume = JSON.parse(stringResume);
        // console.log(JSON.parse(stringResume));
        res.json({ strengths: parsedResume.description });
    } catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }

}


exports.pdfResumeWithExtensionDescription = async (req, res) => {
    console.log(req.files);
    const { cv } = req.files;
    const { title, company, description } = req.body;
    console.log("title", title);
    console.log("company", company);
    console.log("description", description);
    try {
        // cv.mv(path.join(assetsFolder, cv.name));
        const mimeType = cv.mimetype;
        console.log("mimeType =====", mimeType)
        // res.status(200).json({ "message": "ok" })
        // const pdfPath = './SherazCV.pdf';
        // console.log(pdfPath);
        const generatedPdfResume = await pdfResumeGeneration.pdfGenerateWithExtensionDescription(req.body, cv.data, mimeType);
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
exports.savedResumeWithExtensionDescription = async (req, res) => {

    // console.log("body savedResumeWithExtensionDescription", req.body)

    const { uid, jobDescription } = req.body; // Extract UID and jobDescription from the request body

    console.log(req.body)

    try {
        if (!uid) {
            return res.status(400).json({ message: "UID is required." });
        }

        const resume = await ResumeModel.findOne({ uid }); // Fetch resume by UID


        console.log("resume", resume)
        if (!resume) {
            return res.status(404).json({ message: "Resume not found." });
        }
        const sectionData = resume.sections
        // Include jobDescription in the response if provided
        const response = {
            sectionData,
            jobDescription: jobDescription || "No job description provided.",
        };


        const generatedResume = await generatePdfResumeWithDescription(jobDescription, sectionData);

        // console.log("generatedPdfResume", generatedResume)


        const stringResume = generatedResume?.split("undefined")[0];
        console.log(stringResume);
        const parsedResume = JSON.parse(stringResume);

        res.status(200).json(parsedResume);
    } catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({ message: "An error occurred while fetching the resume." });
    }

    // console.log(req.files);
    // const { cv } = req.files;
    // const { title, company, description } = req.body;
    // console.log("title", title);
    // console.log("company", company);
    // console.log("description", description);
    // try {
    //     // cv.mv(path.join(assetsFolder, cv.name));
    //     const mimeType = cv.mimetype;
    //     console.log("mimeType =====", mimeType)
    //     // res.status(200).json({ "message": "ok" })
    //     // const pdfPath = './SherazCV.pdf';
    //     // console.log(pdfPath);
    //     const generatedPdfResume = await pdfResumeGeneration.pdfGenerateWithExtensionDescription(req.body, cv.data, mimeType);
    //     // console.log(generatedPdfResume);
    //     const stringResume = generatedPdfResume?.split("undefined")[0];
    //     // console.log(generatedPdfResume);
    //     // console.log("ss");
    //     // console.log(stringResume);
    //     res.json(JSON.parse(stringResume));
    // }
    // catch (e) {
    //     console.log(e.message);
    //     res.json({ "message": e.message });
    // }

}
