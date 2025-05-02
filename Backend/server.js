// imports
import express, { urlencoded } from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
// import session, { Cookie } from 'express-session';
// import passport from 'passport';
// import localStrategy from "passport-local";
import userRouter from "./routes/userRoutes.js";
import flash from "express-flash";
import cartRouter from "./routes/cartRoutes.js";
import "dotenv/config";
import orderRouter from "./routes/orderRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import restroRouter from "./routes/restroRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

// app config
const app = express();
const port = process.env.PORT || 3000;

//connection to db
connectDb();

//passport config

// app.use(session({cookie:{maxAge:6000},
//     secret:"tomato",
//     resave : false,
//     saveUninitialized:false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(flash());

//api endpoints
// app.use((req,res,next)=>{
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
// })
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/address", addressRouter);
app.use("/api/restro", restroRouter);
app.use("/admin", adminRouter);
app.use("/images", express.static("uploads"));

//app.listen

app.get("/", (req, res) => {
  res.send("successfull payment");
});

app.listen(port, () => {
  console.log(`"lisentin on port ${port}"`);
});
