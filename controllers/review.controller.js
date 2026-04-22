import Review from "../models/review.js";


async function createReview(req, res) {
    try{
        const review = await Review.create(req.body);
        if(!review){
            return res.status(400).json({
                message: "Review not save"
            })
        }
        return res.status(201).json({
            message: "Review is created successfully.",
            data:review
        })

    }catch(err){
        return res.status(500).json({
            message:"server error",
            error:err.message
        });
    }
}




async function getReviewByIdFilmId(req, res) {
    try {
        const filmId = req.params.id;

        const reviews = await Review.find({ filmId })
            .populate("userId", "firstName lastName email")
            .populate("filmId", "filmName");

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({
                message: "No reviews found for this film"
            });
        }

        return res.status(200).json({
            message: "Reviews fetched successfully",
            data: reviews
        });

    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}

async function deleteReview(req, res) {
    try{
        const id = req.params.id;
        const review = await Review.findByIdAndDelete(id);
        if(!review){
            return res.status(400).json({
                message: "Review not found for this film"
            })
        }
        return res.status(201).json({
            message: "Review is delete successfully.",
            data:review
        })

    }catch(err){
        return res.status(500).json({
            message:"server error",
            error:err.message
        });
    }
}



export default {createReview,getReviewByIdFilmId,deleteReview}