const postModel = require('../model/post.model');
const generateCaption = require('../service/ai.service');

const createPostController = async (req, res) => {

    const file = req.file;

    console.log("File received, ", file)

    const base64Image = new Buffer.from(file.buffer).toString('base64'); 

    const caption = await generateCaption(base64Image)

    console.log("Generate caption: ", caption)

    return res.status(201).json({
        success: true,
        message: "Caption generated successfully",
        caption
    })

}

module.exports = {
    createPostController
}