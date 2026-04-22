import express from "express";
import seatController from "../controllers/seat.controller.js";



const router = express.Router();

router.get("/",seatController.getAllSeats);
router.get("/:id",seatController.getSeatsByScreen);
router.post("/",seatController.createSeats)
router.put("/:id",seatController.updateSeat)
router.delete("/:id",seatController.deleteSeat,)


export default router;