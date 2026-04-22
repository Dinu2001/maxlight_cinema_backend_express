import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routers/user.router.js";
import filmRouter from "./routers/film.router.js";
import screenRouter from "./routers/screen.router.js";
import seatRouter from "./routers/seat.router.js";
import reviewRouter from "./routers/review.router.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json())


// routers
app.use("/user",userRouter)
app.use("/film",filmRouter)
app.use("/screen",screenRouter)
app.use("/seat",seatRouter)
app.use("/review",reviewRouter)


const port = process.env.PORT


async function connectDatabase() {
    const connection = await mongoose.connect(process.env.DATABASE_URI)
    if(connection){
        console.log("MongoDB Connected");
    }else{
        console.log("MongoDB not connected");
    }
}


app.listen(port, async () => {
    await connectDatabase();
    console.log(`Listening on port: ${port}`)
})