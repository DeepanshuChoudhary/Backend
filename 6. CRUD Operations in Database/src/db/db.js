const mongoose = require('mongoose');

const connectDB = () => {

    mongoose.connect(process.env.MONGOOSE_CONNECT)
        .then(() => {
            console.log("MongoDB are connected")
        }).catch((err) => {
            console.log("MongoDB Error : ", err)
        })

}

module.exports = connectDB