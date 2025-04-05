import { globalErrorHandling } from "./middleware/asyncHandler.js"
import authRouter from "./modules/auth/auth.router.js"


export const bootStrap = (app, express) => {
    // parse data
    app.use(express.json())

    // routing
    app.use('/auth',authRouter)

    // globalErrorHandling
    app.use(globalErrorHandling)
}
