import Screen from "../models/screen.js";

async function createScreen(req, res) {
    try {
        const screen = await Screen.create(req.body);

        return res.status(201).json({
            message: "Screen created successfully",
            data: screen
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function getAllScreens(req, res) {
    try {
        const screens = await Screen.find();

        return res.status(200).json({
            message: "Screens fetched successfully",
            data: screens
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function getScreenById(req, res) {
    try {
        const id = req.params.id;

        const screen = await Screen.findById(id);

        if (!screen) {
            return res.status(404).json({
                message: "Screen not found"
            });
        }

        return res.status(200).json({
            message: "Screen fetched successfully",
            data: screen
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function updateScreen(req, res) {
    try {
        const id = req.params.id;

        const updatedScreen = await Screen.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedScreen) {
            return res.status(404).json({
                message: "Screen not found"
            });
        }

        return res.status(200).json({
            message: "Screen updated successfully",
            data: updatedScreen
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function deleteScreen(req, res) {
    try {
        const id = req.params.id;

        const deletedScreen = await Screen.findByIdAndDelete(id);

        if (!deletedScreen) {
            return res.status(404).json({
                message: "Screen not found"
            });
        }

        return res.status(200).json({
            message: "Screen deleted successfully",
            data: deletedScreen
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

export default {createScreen, getAllScreens, getScreenById, updateScreen, deleteScreen};