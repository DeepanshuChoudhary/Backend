const express = require('express');
const upload = require('../config/multer');
const sendFiles = require('../config/imagekit');

const router = express.Router()

// For Single File
// router.post('/files', upload.single('image'), async (req, res) => {
//     console.log(req.file)

//     const uploadedFiles = await sendFiles(req.file.buffer, req.file.originalname)
//     console.log(uploadedFiles)

//     res.send("ok")
// })



// For Multiple Files
router.post('/files', upload.array('image', 2), async (req, res) => {
    console.log(req.files)

    const uploadedFiles = await Promise.all( req.files.map( async (elem) => {
        const file = await sendFiles(elem.buffer, elem.originalname)
        return file;
    }))

    const onlyUrls = uploadedFiles.map((elem) => elem.url)

    console.log("Upload Images : ", onlyUrls)

    res.send("ok")
})

module.exports = router;