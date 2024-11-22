// imports
import express, { urlencoded } from 'express' ;
import cors from 'cors';
import { connectDb } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import session, { Cookie } from 'express-session';
import passport from 'passport';
import localStrategy from "passport-local";
import User from './models/userModel.js';
import  userRouter  from './routes/userRoutes.js';

// app config
const app = express();


//connection to db
connectDb();


//passport config

app.use(session({cookie:{maxAge:6000},
    secret:"tomato",
    resave : false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(user.deserializeUser());

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//api endpoints
app.use('/api/food',foodRouter);
app.use('/api/user',userRouter);
app.use('/images',express.static('uploads'));



//app.listen

app.get('/',(req,res)=>{
    res.send('working');
})

app.listen(3000,()=>{
    console.log ('lisentin on port 3000');
});