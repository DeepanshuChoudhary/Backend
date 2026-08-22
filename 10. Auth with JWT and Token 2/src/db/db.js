const mongoose = require('mongoose');

const connectDB = async (req, res) => {

    await mongoose.connect(process.env.MONGOOSE_CONNECT)
        .then(() => {
            console.log("MongoDB are connected")
        }).catch((err) => {
            console.log("MongoDB hve issue, Error : ", err)
        })

}

module.exports = connectDB