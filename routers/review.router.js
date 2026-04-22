import express from "express";
import reviewController from "../controllers/review.controller.js";

const router = express.Router();

router.get("/",reviewController.createReview)
router.get("/:id",reviewController.getReviewByIdFilmId)


export default router;