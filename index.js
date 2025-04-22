// import module
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connection.js'
import { bootStrap } from './src/bootStrap.js'

// create server
const app = express()
const port = process.env.port || 3000

dotenv.config({path: path.resolve('./config/.env')})


// connect db
connectDB()

// bootStrap
bootStrap(app,express)

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // successful login
      res.redirect('/profile');
    }
  );
  
  app.get("/profile", (req, res) => {
    if (!req.user) {
      return res.redirect("/auth/google");
    }
    res.send(`<h1>Welcome ${req.user.displayName}</h1>`);
  });
  

// listen
app.listen(port, () => {
    console.log('server is running on port',port);
})