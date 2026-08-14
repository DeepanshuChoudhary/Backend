const mongoose = require('mongoose')

const connectDB = () => {

    mongoose.connect(process.env.MONGOOSE_CONNECT)
        .then(() => {
            console.log("Mongodb are connected successfully")
        }).catch((err) => {
            console.log("Mongodb Error : ", err)
        })

}

module.exports = connectDB