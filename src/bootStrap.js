import session from "express-session";
import passport from "passport";
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import { globalErrorHandling } from "./middleware/asyncHandler.js"
import { authRouter, doctorRouter, userDataRouter, userRouter, newsRouter } from "./modules/index.js"


export const bootStrap = (app, express) => {
    // parse data
    app.use(express.json())

    // routing
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/doctor', doctorRouter)
    app.use('/userData', userDataRouter)
    app.use('/news', newsRouter)
    


    // globalErrorHandling
    app.all("/", (req, res, next) => {
        return res.json({ message: "invalid url" })
    })
    app.use(globalErrorHandling)


    // google
    // session
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    }))

    // passport
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(
       new googleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://localhost:3000/auth/google/callback" 
       },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile)
      }
    )
    )

    passport.serializeUser((user, done) => done (null, user))
    passport.deserializeUser((user, done) => done (null, user))
}
