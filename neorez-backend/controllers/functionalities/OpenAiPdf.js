const fs = require('fs');
const pdf = require('pdf-parse');
const OpenAI = require('openai');
const mammoth = require("mammoth");
const apiKey = process.env.OPENAI_API_KEY;

//old
//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

// Create an instance of OpenAI using your key
const openaiInstance = new OpenAI({
  apiKey: apiKey,
});


// exports.pdfGenerateChat = async function (pdfPath) {
//   // const dataBuffer = fs.readFileSync(pdfPath);
//   const dataBuffer = pdfPath
//   const data = await pdf(dataBuffer);
//   console.log("pdf Data", data.text);
//   // return data.text;
//   const response = await generateChat(data.text);
//   return response;

// }

exports.pdfGenerateChat = async function (fileBuffer, mimeType) {
  try {
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
    const response = await generateChat(extractedText);
    return response;
  } catch (error) {
    console.error("Error extracting text:", error.message);
    throw new Error("Failed to process the file. Please try again.");
  }
};

exports.pdfGenerateWithExtensionDescription = async function (bodydata, fileBuffer, mimeType) {
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
    const response = await generatePdfResumeWithDescription(bodydata?.description, extractedText);
    return response;
  } catch (error) {
    console.error("Error extracting text:", error.message);
    throw new Error("Failed to process the file. Please try again.");
  }
};


// var parsedText = 0;
// const pdfPath = './SherazCV.pdf';
// extractTextFromPDF(pdfPath)
//     .then(parsedTextt => {
//         parsedText = parsedTextt;
//         // console.log("rawwwwwwwwwwwwwwwwwwwww", parsedTextt)
//     }).then(res => {
//         console.log(parsedText);
//         generateChat(parsedText);
//     })
//     .catch(error => {
//         console.error(error);
//     });



// async function processStream(stream) {
//   let receivedData = '';
//   try {

//     for await (const chunk of stream) {
//       if (chunk.object === 'chat.completion.chunk') {
//         receivedData += chunk.choices[0].delta.content;
//       }
//       if (chunk.usage) {
//         console.log("Token Usage (from stream metadata):", chunk.usage);
//       }
//     }
//     return receivedData;
//   } catch (er) { console.log(er); }
// }

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

// async function generateChat(text) {
//   console.log("--------------------------------AI RESUME----------------------------------------", text);
//   try {

//     const stream = await openaiInstance.chat.completions.create({

//       "model": "gpt-4o",
//       "response_format": { "type": "json_object" },
//       "messages": [
//         {
//           "role": "user",
//           "content": `This is my resume data: ${text}. Enhance the resume using the same personal information, and if a summary is missing, generate one based on the role and skills provided. The response should be formatted in a JSON structure with the following sections:
// You are an AI tasked with generating a comprehensive CV based on provided user input. Your responses must strictly adhere to the given JSON format, using the specified  names without any modifications or additions  .The response should be formatted in a JSON structure.

// Now my previous cv data is  :${text || ""} 



// ### Guidelines for CV Generation:

// 1. **Input Variability**: You may receive various combinations of input data, including:

//    - Previous CV data to create a new CV.
//    - Ensure that you include all relevant and accurate information.
//    - Do not skip any crucial sections or details required for a comprehensive CV.
//    - Maintain proper grammar, punctuation, and capitalization throughout.
//    - Only include the information provided—avoid adding irrelevant or unnecessary details.
//    - Ensure all skills listed in the existing CV are incorporated.
//    - Include detailed descriptions of work experience as provided, without omission.
//    - Pickup the dates that are in the Previous CV data.
//    - In the phone number should be in the format "11234567890". Don't include non-numeric characters in the phone number.
//    - In the address should pick the city.
//    - In the country should pick the country.

// 2. **How to generate jobTitle**

//    - if the job title and job decription both are "" then assume the job title based on the previous cv data.
//    - if the job title are "" then assume the job title based on the job description. so understand the job description to generate the job title.


// 3. **How to generate profile data**
// -  - if the cv is generated based on the Job title or job description then use provided name , email , contact number . if any of these are missing then generate this specific random .
//    - if the cv is generated based on the previous cv data then you must use provided  previous cv  name , email , contact number . if any of these are missing then generate this specific random .


// 4. **How to generate summary**
//   - if the cv is generated based on the Job title or job description . Then  generate a summary based on the job description or jobtitle.
//   - if the cv is generated based on the previous cv data then generate summary using previous cv data .

// 5. **How to generate education**
//   - if the cv is generated based on the Job title or job description . Then  generate a education based on the job description or jobtitle.
//   - if the cv is generated based on the previous cv data then use previous cv education data .
//   - ensure that the dates in education picks the dates that are in the Previous CV data.
//   - ensure that you must understand all format of dates in education .
//   - if the date is in this format  01/2023 to 06/2023 then convert this in to this format  september 2023 - June 2023.


// 6. **How to generate workExperience**
//   - if the cv is generated based on the Job title or job description . Then  generate a workExperience based on the job description or jobtitle.
//   - if the cv is generated based on the previous cv data then use previous cv workExperience data or generate based on the previous cv data.
//   - ensure that the dates in workExperience picks the dates that are in the Previous CV data.
//   - note that you must select relevant dates in workExperience that are in the Previous CV data.
//   - ensure that you must understand all format of dates in workExperience.
//   - if the date is in this format  01/2023 to 06/2023 then convert this in to this format  september 2023 - June 2023.
//   - ensure the response is in the < ul > and <li> formate  
//   - example of the points :
//   <ul>
//     <li> Tailor work experience based on the job title or job description.</li>
//     <li> Use work experience data from the previous CV, or generate it based on the previous data.</li>
//     <li> Ensure dates in work experience match those provided in the previous CV.</li>
//     <li> Select relevant dates from the previous CV for work experience.</li>
//     <li> Understand and handle all date formats in work experience.</li>
//     <li> Convert dates to a proper format, e.g., "01/2023 to 06/2023" → "January 2023 - June 2023".</li>
//   </ul>



// 7. **How to generate skills**
//   - if the cv is generated based on the Job title or job description . Then  generate a skills based on the job description or jobtitle.
//   - if the cv is generated based on the previous cv data then use previous cv skills  or generate based on the previous cv data .

// 8. **How to generate languages**
//   - if the cv is generated based on the Job title or job description . Then  generate a languages based on the job description or jobtitle.
//   - if the cv is generated based on the previous cv data then use previous cv languages  or generate based on the previous cv data .

// 9. **How to generate hobbies**
//   - If hobbies are provided in the previous CV data, use them.
//   - If no hobbies are provided, infer hobbies based on the job description or job title. For example:
//     - For a software developer: coding, gaming, or open-source contributions.
//     - For a teacher: reading, writing, or gardening.
//   - Always include hobbies in the CV, and ensure they are relevant or general (e.g., traveling, fitness, or photography).

// 10. **How to generate certifications**
//   - if the cv is generated based on the Job title or job description . Then  generate a certifications based on the job description or jobtitle.
//   - if the cv is generated based on the previous cv data then use previous cv certifications or generate based on the previous cv data .

// 11. **when to add customSections**
//    - if the cv is generated based on the Job title or job description then don't include the customSections.
//    - if the cv is generated based on the previous cv data then you must include the customSections.customSections have these keys:
//    {
//             projectName: "" //add the random name don't add the N/A
//             startDate: ""
//             endDate: ""
//             description: "" (HTML structure with <ul> and <li> tags for project features)
//           }
//     if previous cv data contain some projects then include the customSections .if dates are not provided then assume the current date as start and end dates. Date format should be in "month year".

// **How to generate response**
// . **Output Structure**: The following is an example of the output format. The output must be structured as follows:

//     {
//   "profile": {
//     "column": "left",
//     "header": "profile",
//     "type": "profile",
//     "profileImage": "",
//     "name": "",  // John Doe
//     "contactNumber": "",  //add the random don't add the N/A  44 1234 567890
//     "email": "", // johndoe@email.com
//     "address": "",   // add the random xyz street 123  don't add the N/A  23 Elm Street, xyz
//     "jobTitle": "", 
//     "links": []  // add the random don't add the N/A 
//      visibility: {
//                 contactNumber: true,
//                 email: true,
//                 address: true,
//                 links: true,
//                 },
//   },
//   "summary": {
//     "header": "summary",
//     "column": "right",
//     "type": "about",
//     "items": [
//       {
//         "description": ""
//       }
//     ]
//   },
//   "education": {
//     "column": "left",
//     "header": "education",
//     "type": "education",
//     "items": [
//       {
//         "degree": "",  // BSc in Computer Science
//         "institution": "", // University of Leeds
//         "reference": "",
//         "startDate": "", // september 2018
//         "endDate": "" //  september 2022 or present
//       }
//     ]
//   },
//   "workExperience": {
//     "column": "right",
//     "header": "Work Experience",
//     "type": "workExperience",
//     "items": [
//       {
//         "jobTitle": "", 
//         "company": "",
//         "startDate": "", // september 2018 
//         "endDate": "", //  september 2022 or present
//         "description": ""
//       }
//     ]
//   },
//   "skills": {
//     "column": "left",
//     "header": "skills",
//     "type": "skills",
//     "items": [
//       {
//         "name": "", // HTML5
//         "level": "" // Advanced
//       }
//     ]
//   },
//   "certifications": {
//     "header": "certifications",
//     "type": "certificates",
//     "column": "right",
//     "items": [
//       {
//         "title": "",
//         "date": "",
//         "description": ""
//       }
//     ]
//   }
//     "customSections":{
//       - header: "Projects"
//       - type: "projects"
//       - column: "right"
//       - items: [
//           {
//             projectName: ""  // add the random don't add the N/A 
//             description: "" // add the random don't add the N/A  (HTML structure with <ul> and <li> tags for project features)
//           }
//         ]}
// }


// **Output Format**: Ensure the response is valid JSON and formatted exactly as described above, with no additional text or alterations to the key names.

// **Compliance**: Follow the rules above rigorously to ensure the generated CV meets user expectations and requirements.

// Your task is to take the input data, apply the guidelines above, and return a CV formatted as specified.`        }
//       ],
//       "stream": true,
//       stream_options: { include_usage: true } // Include token usage


//     });
//     // console.log("Token Usage:", response.data.usage);
//     // console.log("stream", stream);
//     const receivedString = await processStream(stream);
//     // console.log("k", receivedString);
//     return receivedString;
//   } catch (er) {
//     console.log(er);
//     return er;
//   }
// }


async function generateChat(text) {
  // console.log("--------------------------------AI RESUME----------------------------------------", text);
  try {

    const stream = await openaiInstance.chat.completions.create({

      "model": "gpt-4o",
      "response_format": { "type": "json_object" },
      "messages": [
        {
          "role": "user",
          "content": `This is my resume data: ${text}. Do not modify, enhance, or alter the resume in any way. Simply return the exact resume content as it is in the response. Maintain the exact format, structure, and details without adding or removing anything.
**How to generate response**

### Guidelines for CV Generation:

-**Input Variability**: You may receive various combinations of input data, including:

   - Previous CV data to create a new CV.
   - Ensure that you include all relevant and accurate information.
   - Do not skip any crucial sections or details required for a comprehensive CV.
   - Maintain proper grammar, punctuation, and capitalization throughout.
   - Only include the information provided—avoid adding irrelevant or unnecessary details.
   - Ensure all skills listed in the existing CV are incorporated.
   - Include detailed descriptions of work experience as provided, without omission.
   - Pickup the dates that are in the Previous CV data.
   - In the phone number should be in the format "11234567890". Don't include non-numeric characters in the phone number.
   - In the address should pick the city.
   - In the country should pick the country.
   - Ensure that if the projects sections are added to the resume data then only show it in the resume data in customSections.
   - If the project section are not added in teh resume data then dont add customSections.

-**Certificates Section**: 
    Ensure the certificates section is included if there are certificates provided. Do **not** send an empty array for certificates. If no certificates are provided, **omit** the entire section entirely.

    For certificates:
    - Extract relevant certificates from the resume data if available
    - Make sure certificates are relevant to the professional experience and skills mentioned in the resume data
    - If no certificates are found in the resume data, use the certificates provided in the data above
    - Ensure certificate entries include name, issuing organization, and date (if available)
    - Format certificates consistently with the rest of the document
    - Only include professional certificates related to the candidate's field


-**How to generate skills**
   - if the cv is generated based on the Job title or job description . Then  generate a skills based on the job description or jobtitle.
   - if the cv is generated based on the previous cv data then use previous cv skills  or generate based on the previous cv data .
   - Ensure that don't skip any skills in the previous cv data.
  **Important** : You have to must add the certificate section in a response in anyway.


. **Output Structure**: The following is an example of the output format. The output must be structured as follows:

    {
  "profile": {
    "column": "left",
    "header": "profile",
    "type": "profile",
    "profileImage": "",
    "name": "",  // John Doe
    "contactNumber": "",  //add the random don't add the N/A  44 1234 567890
    "email": "", // johndoe@email.com
    "address": "",   // add the random xyz street 123  don't add the N/A  23 Elm Street, xyz
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
        "description": "" // add the bullet points like <ul><li></li><li></li></ul>
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
      - header: "Projects"
      - type: "projects"
      - column: "right"
      - items: [
          {
            projectName: ""  // add the random don't add the N/A 
            description: "" // add the random don't add the N/A  (HTML structure with <ul> and <li> tags for project features)
          }
        ]}
}
      

**Output Format**: Ensure the response is valid JSON and formatted exactly as described above, with no additional text or alterations to the key names.

**Compliance**: Follow the rules above rigorously to ensure the generated CV meets user expectations and requirements.

Your task is to take the input data, apply the guidelines above, and return a CV formatted as specified.`        }
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



async function generatePdfResumeWithDescription(jobDescription, text) {
  console.log("--------------------------------AI RESUME----------------------------------------", jobDescription, text);
  try {

    const stream = await openaiInstance.chat.completions.create({

      "model": "gpt-4o",
      "response_format": { "type": "json_object" },
      "temperature": 0.6,
      "messages": [

        {
          "role": "system",
          "content": `This is my resume data: ${text}.
          First Explain the resume data you to extract the summary or intent of the resume data [text].
          Then you have to create a new resume accordingly to the job description provided below,
          Below is the job description: ${jobDescription}. Use both the resume data and the job description to generate an enhanced resume. If a summary is missing, 
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
          "content": `Here is my resume data: ${text}. And this is the job description: ${jobDescription}. Use both inputs to create a tailored and enhanced resume. Ensure the output adheres strictly to the specified JSON format .`
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



