import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser';

//import routes
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";


const app = express();
dotenv.config();
app.use(cookieparser());
app.use(express.json());


//db connection
const connect = async (req, res, next) => {
    try {
      await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("connected db....");
      }); 
    } catch (err) {
      res.status(404).json({ message: "not connected" });
      console.log(err);
    }
  };
  
//middleware

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

//error handling
app.use((err, req, res, next) => {
const status = err.status || 500;
const msg = err.message || "something went wrong";
return res.status(status).json({
    success: false,
    status: status,
    message: msg
});
})


app.listen(8800, () => {
    connect();
    console.log('connected server');
})