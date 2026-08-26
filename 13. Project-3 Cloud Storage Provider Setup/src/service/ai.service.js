require('dotenv').config()
const { GoogleGenAI } = require('@google/genai')

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateAIResponse = async (req, res) => {

    try {
        const interaction = await ai.interactions.create({
            model: "gemini-3.7-flash",
            input: "Explain how AI works in a few words"
        })
    }
    catch(err) {
        console.log("AI server error : ", err)
    }

}

// const interaction = await ai.interactions.create({
//     model: "gemini-3.7-flash",
//     input: "Explain how AI works in a few words",
// });
// console.log(interaction.output_text);