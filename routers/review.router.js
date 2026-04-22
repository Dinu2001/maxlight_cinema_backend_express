import express from "express";
import reviewController from "../controllers/review.controller.js";

const router = express.Router();

router.post("/",reviewController.createReview)
router.get("/:id",reviewController.getReviewByIdFilmId)
router.delete("/:id",reviewController.deleteReview)


export default router;