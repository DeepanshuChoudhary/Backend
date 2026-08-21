const mongoose = require('mongoose');

const connectDB = async (req, res) => {
    
    await mongoose.connect(process.env.MONGOOSE_CONNECT)
        .then(() => {
            console.log("Mongodb are connected successfully")
        }).catch((err) => {
            console.log("Mongodb are not connected, Error : ", + err)
        })

}

module.exports = connectDB