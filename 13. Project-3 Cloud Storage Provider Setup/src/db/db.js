const mongoose = require('mongoose');

const connectDB = async (req, res) => {

    try {
        await mongoose.connect(process.env.MONGOOSE_CONNECT)
            .then(() => {
                console.log("MongoDB connected successfully !!")
            })
    }
    catch(err) {
        console.log("MongoDB Error : ", err)
    }

}

module.exports = connectDB