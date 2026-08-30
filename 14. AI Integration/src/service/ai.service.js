const { GoogleGenAI } = require('@google/genai')

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

const generateCaption = async (base64ImageFile) => {

    const interaction = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: [
            {
                type: "text", text: "Caption this image."
            },
            {
                type: "image",
                data: base64ImageFile,
                mime_type: "image/jpeg"
            }
        ],
        system_instruction: `
            You are an expert in generating caption for image.
            You generate single caption for the image.
            Your caption should be short and concise.
            You use hashtags and emojis in the caption
        `
    });
    console.log(interaction.output_text);

    return interaction.output_text

}

module.exports = generateCaption