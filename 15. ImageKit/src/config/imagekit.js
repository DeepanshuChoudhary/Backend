const Imagekit = require('imagekit');

const storageInstance = new Imagekit({

    urlEndpoint: "https://ik.imagekit.io/t5nxpry43",
    privateKey: "private_7J8vktrWe+GEEWf11Wq4v9TBKlI=",
    publicKey: "public_6DXkFplT8HRhMHlyqPacW34J2g8="

})

const sendFiles = async (file, fileName) => {

    const options = {
        file,
        fileName
    }

    return await storageInstance.upload(options)

}

module.exports = sendFiles