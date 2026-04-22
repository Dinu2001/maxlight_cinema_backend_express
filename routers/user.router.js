import express from "express";
import userController from "../controllers/user.controller.js";


const router = express.Router();

router.post("/register",userController.register);
router.get("/", userController.getUserDetails);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);


export default router;
