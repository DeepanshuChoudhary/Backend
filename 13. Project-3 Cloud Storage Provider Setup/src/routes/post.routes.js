const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const { authMiddleware } = require('../middleware/auth.middleware');
const multer = require('multer')

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage()
})

// POST /api/post [protected]
router.post('/', authMiddleware,
    upload.single("image"),
    createPostController)

module.exports = router;