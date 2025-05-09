// import module
import fs from 'fs'
import path from 'path'
import multer, { diskStorage } from "multer";
import { nanoid } from 'nanoid';
import { AppError } from './appError.js';

export const fileValidation = {
    image: ['image/png', 'image/jpeg', 'image/jpg'],
}

// fileUpload
export const fileUploads = ({folder, allowType = fileValidation.image}) => {
    const storage = diskStorage({
        destination: (req, file, cb) => {
            const fullPath = path.resolve(`uploads/${folder}`)
            if (!fs.existsSync(fullPath)) {
                return fs.mkdirSync(fullPath, { recursive: true })
            }
            cb(null, `uploads/${folder}`)
        },
        filename: (req, file, cb) => {
            cb(null, nanoid() + "-" + file.originalname)

        }
    })

    const fileFilter = (req, file, cb) => {
        if(allowType.includes(file.mimetype)){
            return cb(null, true)
        }
        cb(new AppError('invalid file formate', 400), false)
            
    }
    return multer({ storage, fileFilter })
}