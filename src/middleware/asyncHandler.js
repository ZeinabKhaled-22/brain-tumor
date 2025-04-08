import { AppError } from "../utilies/appError.js"
import { deleteCloudFile } from "../utilies/cloud.js"
import { deleteFile } from "../utilies/file.js"

export const asyncHandler = (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch((err) => { next(new AppError(err.message, err.statusCode)) })
    }
    
}

// global error handling
export const globalErrorHandling = (err, req, res, next) => {
    // rollback file system
    if(req.file){
        deleteFile(req.file?.path)
    }
    // rollback of cloud
    if(req.failFile){
        deleteCloudFile(req.failFile.public_id)
    }
    return res.status(err.statusCode || 500).json({ message: err.message, success: false })

}