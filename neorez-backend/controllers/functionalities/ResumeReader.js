const fs = require('fs');
const pdf = require('pdf-parse');
const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY;;

// Create an instance of OpenAI using your key
const openaiInstance = new OpenAI({
    apiKey: apiKey,
});

async function extractTextFromPDF(pdfPath) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    return data.text;
}

var parsedText = 0;
const pdfPath = './assets/Mummad Tehsin ReactJs Developer.pdf';
extractTextFromPDF(pdfPath)
    .then(parsedTextt => {
        parsedText = parsedTextt;
        // console.log("rawwwwwwwwwwwwwwwwwwwww", parsedTextt)
    }).then(res => {
        // console.log(parsedText);
        generateChat(parsedText);
    })
    .catch(error => {
        console.error(error);
    });



async function processStream(stream) {
    let receivedData = '';

    for await (const chunk of stream) {
        if (chunk.object === 'chat.completion.chunk') {
            // console.log("Chunks", chunk.choices[0].delta.content)
            if (chunk.choices[0].delta.content) {
                receivedData += chunk.choices[0].delta.content;
            }
        }
    }

    return receivedData;
}

async function generateChat(text) {
    console.log("--------------------------------AI RESUME----------------------------------------");
    const stream = await openaiInstance.chat.completions.create({
        model: 'gpt-4',
        messages: [{
            role: 'user', content: `This is my resume ${text}. Read it and update it and don't miss anything.`
        }],
        stream: true,
    });

    // console.log("here2");

    // Process and receive data as a single string
    const receivedString = await processStream(stream);
    // let testJson = JSON.parse(receivedString)
    // console.log("testJson:", receivedString)

}