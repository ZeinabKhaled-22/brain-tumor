// import module
import path from 'path'
import fs from 'fs'

// delete file
export const deleteFile = (filePath) => {
    const fullPath = path.resolve(filePath)
    fs.unlinkSync(fullPath)
}