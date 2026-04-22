import express from "express";
import screenController from "../controllers/screen.controller.js";



const router = express.Router();

router.get("/",screenController.getAllScreens)
router.get("/:id",screenController.getScreenById)
router.post("/",screenController.createScreen)
router.put("/:id",screenController.updateScreen)
router.delete("/:id",screenController.deleteScreen)


export default router;