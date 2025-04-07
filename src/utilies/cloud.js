// import module
import path from 'path'
import { v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'

// cloudinary
dotenv.config({path: path.resolve('./config/.env')})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRE

})
export default cloudinary


