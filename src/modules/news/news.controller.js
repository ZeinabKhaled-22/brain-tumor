 import { News } from "../../../db/index.js"

//get all news
export const getAllNews = async (req,res,next) => {
    // get all news
    const allNews = await News.find()
    // send response
    return res.status(200).json({data: allNews, success: true})
}