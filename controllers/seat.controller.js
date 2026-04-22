import Seat from "../models/seat.js";



async function createSeats(req, res) {
    try {
        const { screenId, rowLabel, seatCount, seatType } = req.body;

        if (!screenId) {
            return res.status(400).json({
                message: "screenId is required"
            });
        }

        const seats = [];

        for (let i = 1; i <= seatCount; i++) {
            seats.push({
                screenId,
                rowLabel,
                seatNumber: i,
                seatType: seatType || "STANDARD"
            });
        }

        const createdSeats = await Seat.insertMany(seats);

        return res.status(201).json({
            message: "Seats created successfully",
            data: createdSeats
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}










async function getAllSeats(req, res) {
    try {
        const seats = await Seat.find().populate("screenId");

        return res.status(200).json({
            message: "Seats fetched successfully",
            data: seats
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function getSeatsByScreen(req, res) {
    try {
        const { screenId } = req.params;

        const seats = await Seat.find({ screenId: req.params.id });

        return res.status(200).json({
            message: "Screen seats fetched successfully",
            data: seats
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function updateSeat(req, res) {
    try {
        const id = req.params.id;

        const updatedSeat = await Seat.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedSeat) {
            return res.status(404).json({
                message: "Seat not found"
            });
        }

        return res.status(200).json({
            message: "Seat updated successfully",
            data: updatedSeat
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function deleteSeat(req, res) {
    try {
        const id = req.params.id;

        const deletedSeat = await Seat.findByIdAndDelete(id);

        if (!deletedSeat) {
            return res.status(404).json({
                message: "Seat not found"
            });
        }

        return res.status(200).json({
            message: "Seat deleted successfully",
            data: deletedSeat
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}


export default {createSeats, getAllSeats, getSeatsByScreen, updateSeat, deleteSeat};