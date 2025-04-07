// import module
import multer, { diskStorage } from "multer";
import { AppError } from './appError.js';
import { fileValidation } from "./multer.js";

// fileUpload
export const cloudUploads = ({ allowType = fileValidation.file} = {}) => {
    const storage = diskStorage({})

    const fileFilter = (req, file, cb) => {
        if(allowType.includes(file.mimetype)){
            return cb(null, true)
        }
        cb(new AppError('invalid file formate', 400), false)
            
    }
    return multer({ storage, fileFilter })
}