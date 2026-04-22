import Showtime from "../models/showtime.js";


async function createShowtime(req, res) {
    try {
        const { filmId, screenId, showDate, startTime, endTime } = req.body;

        if (!filmId || !screenId) {
            return res.status(400).json({
                message: "filmId and screenId are required"
            });
        }

        const showtime = await Showtime.create({
            filmId,
            screenId,
            showDate,
            startTime,
            endTime
        });

        return res.status(201).json({
            message: "Showtime created successfully",
            data: showtime
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}


async function getShowtimesByFilm(req, res) {
    try {
        const filmId = req.params.filmId;

        const showtimes = await Showtime.find({ filmId })
            .populate("screenId", "screenName");

        return res.status(200).json({
            message: "Film showtimes fetched successfully",
            data: showtimes
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function getAllShowtimes(req, res) {
    try {
        const showtimes = await Showtime.find()
            .populate("filmId", "filmName")
            .populate("screenId", "screenName");

        return res.status(200).json({
            message: "Showtimes fetched successfully",
            data: showtimes
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function getShowtimeById(req, res) {
    try {
        const id = req.params.id;

        const showtime = await Showtime.findById(id)
            .populate("filmId", "filmName")
            .populate("screenId", "screenName");

        if (!showtime) {
            return res.status(404).json({
                message: "Showtime not found"
            });
        }

        return res.status(200).json({
            message: "Showtime fetched successfully",
            data: showtime
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function getShowtimesByScreen(req, res) {
    try {
        const screenId = req.params.screenId;

        const showtimes = await Showtime.find({ screenId })
            .populate("filmId", "filmName");

        return res.status(200).json({
            message: "Screen showtimes fetched successfully",
            data: showtimes
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}


// async function getShowtimesByDate(req, res) {
//     try {
//         const { date } = req.query;
//
//         const showtimes = await Showtime.find({ showDate: date })
//             .populate("filmId", "filmName")
//             .populate("screenId", "screenName");
//
//         return res.status(200).json({
//             message: "Showtimes by date fetched",
//             data: showtimes
//         });
//
//     } catch (err) {
//         return res.status(500).json({
//             message: "server error",
//             error: err.message
//         });
//     }
// }

async function updateShowtime(req, res) {
    try {
        const id = req.params.id;

        const updatedShowtime = await Showtime.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedShowtime) {
            return res.status(404).json({
                message: "Showtime not found"
            });
        }

        return res.status(200).json({
            message: "Showtime updated successfully",
            data: updatedShowtime
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function deleteShowtime(req, res) {
    try {
        const id = req.params.id;

        const deletedShowtime = await Showtime.findByIdAndDelete(id);

        if (!deletedShowtime) {
            return res.status(404).json({
                message: "Showtime not found"
            });
        }

        return res.status(200).json({
            message: "Showtime deleted successfully",
            data: deletedShowtime
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

export default {createShowtime, getAllShowtimes, getShowtimeById, getShowtimesByFilm, getShowtimesByScreen, updateShowtime, deleteShowtime};