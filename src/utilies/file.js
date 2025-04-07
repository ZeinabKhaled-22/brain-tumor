// import module
import path from 'path'
import fs from 'fs'

// delete file
export const deleteFile = (fullPath) => {
    const fullPath = path.resolve(fullPath)
    fs.unlinkSync(fullPath)
}