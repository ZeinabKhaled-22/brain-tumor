import { globalErrorHandling } from "./middleware/asyncHandler.js"
import { authRouter, doctorRouter, userDataRouter, userRouter } from "./modules/index.js"


export const bootStrap = (app, express) => {
    // parse data
    app.use(express.json())

    // routing
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/doctor', doctorRouter)
    app.use('/userData', userDataRouter)

    // globalErrorHandling
    app.all("/", (req, res, next) => {
        return res.json({ message: "invalid url" })
    })
    app.use(globalErrorHandling)
}
