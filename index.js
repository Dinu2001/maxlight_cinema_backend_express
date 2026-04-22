import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routers/user.router.js";
import filmRouter from "./routers/film.router.js";
import screenRouter from "./routers/screen.router.js";
import seatRouter from "./routers/seat.router.js";
import reviewRouter from "./routers/review.router.js";
import cors from "cors";
import showtimeRouter from "./routers/showtime.router.js";
import bookingRouter from "./routers/booking.router.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json())

app.use(cors())


// routers
app.use("/user",userRouter)
app.use("/film",filmRouter)
app.use("/screen",screenRouter)
app.use("/seat",seatRouter)
app.use("/review",reviewRouter)
app.use("/showtime",showtimeRouter)
app.use("/booking",bookingRouter)


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