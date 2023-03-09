

const multer = require('multer')
const path = require('path')

//image upload
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, files, cb) => {
        cb(null, Date.now() + path.extname(files.originalname))
    }
})

const imageUpload = multer({
    storage: fileStorageEngine,
    // limits: { fileSize: '1000000' },
    
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|webp/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
    
}).array('image',5)

module.exports = {imageUpload}