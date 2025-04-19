import joi from 'joi'


// get all news
export const getAllNewsVal = joi.object({
    page: joi.number().integer().min(1).optional(),
    limit: joi.number().integer().min(1).max(100).optional(),
    search: joi.string().min(1).max(100).optional(),
    sortBy: joi.string().valid('createdAt', 'title').optional(),
    order: joi.string().valid('asc', 'desc').optional()
  })