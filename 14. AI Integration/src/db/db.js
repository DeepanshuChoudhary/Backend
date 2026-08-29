const mongoose = require('mongoose');

const connectDB = async (req, res) => {

    try {
        await mongoose.connect(process.env.MONGOOSE_CONNECT)
            .then(() => {
                console.log("Mongodb are connected successfully!!!")
            })
    }
    catch(err) {
        console.log("Mongodb Error: ", err)
    }

}

module.exports = connectDB