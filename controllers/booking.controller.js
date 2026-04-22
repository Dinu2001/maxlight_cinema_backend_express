import Booking from "../models/booking.js";
import BookingSeat from "../models/bookingSeat.js";
import Seat from "../models/seat.js";
import mongoose from "mongoose";

async function createBooking(req, res) {
    try {
        const { userId, showtimeId, seats } = req.body;
        // seats = ["A1", "A2"]

        if (!seats || seats.length === 0) {
            return res.status(400).json({
                message: "Seats are required"
            });
        }

        const booking = await Booking.create({
            userId,
            showtimeId,
            totalSeats: seats.length,
            status: "PENDING"
        });

        // Convert A1 → seat record (IMPORTANT PART)
        for (let seatCode of seats) {

            const rowLabel = seatCode.charAt(0);
            const seatNumber = parseInt(seatCode.slice(1));

            const seat = await Seat.findOne({
                rowLabel,
                seatNumber
            });

            if (seat) {
                await BookingSeat.create({
                    bookingId: booking._id,
                    seatId: seat._id
                });
            }
        }

        return res.status(201).json({
            message: "Booking created successfully",
            data: booking
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}






async function getAllBookings(req, res) {
    try {
        const bookings = await Booking.find()
            .populate("userId", "firstName lastName email")
            .populate("showtimeId");

        // 🔥 Get all booking seats
        const bookingSeats = await BookingSeat.find().populate("seatId");

        // 🔥 Attach seats to each booking
        const result = bookings.map(booking => {
            const seatsForBooking = bookingSeats
                .filter(bs => bs.bookingId.toString() === booking._id.toString())
                .map(bs => `${bs.seatId.rowLabel}${bs.seatId.seatNumber}`);

            return {
                ...booking.toObject(),
                seats: seatsForBooking
            };
        });

        return res.status(200).json({
            message: "Bookings fetched successfully",
            data: result
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}







async function getBookingById(req, res) {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("userId", "firstName lastName email")
            .populate("showtimeId");

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        const bookingSeats = await BookingSeat.find({ bookingId: req.params.id })
            .populate("seatId");

        // 🔥 Convert seat objects → A1 format
        const seatList = bookingSeats.map(bs => {
            const seat = bs.seatId;
            return `${seat.rowLabel}${seat.seatNumber}`;
        });

        return res.status(200).json({
            message: "Booking fetched successfully",
            data: {
                booking,
                seats: seatList   // 👈 A1, A2 format
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}




async function updateBooking(req, res) {
    try {
        const updated = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(200).json({
            message: "Booking updated successfully",
            data: updated
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function deleteBooking(req, res) {
    try {
        await BookingSeat.deleteMany({ bookingId: req.params.id });
        await Booking.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Booking deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

export default {createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking};