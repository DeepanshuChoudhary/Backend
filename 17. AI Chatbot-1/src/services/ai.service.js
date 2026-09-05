// const path = require('path')
// require('dotenv').config({
//     path: path.join(__dirname, '../../.env')
// })
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({})

const generateAIResponse = async (prompt) => {

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash", 
        contents: prompt
    })

    // return interaction.output_text

    return response.text

}

module.exports = generateAIResponse