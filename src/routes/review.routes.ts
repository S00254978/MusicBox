import {Router } from "express";
import ReviewModel from "../models/review.model";
import UserModel from "../models/user.model";
import { validateCreateReview, validateUpdateReview } from "../middleware/validate";
import { reviewQuerySchema } from "../schemas/review.schema";

const router = Router();

router.post("/", validateCreateReview,async (req, res, next)=>{
    try{

        const user = await UserModel.findById(req.body.userId);

        if(!user) {
            res.status(404).json({ message: "User not found"});
            return;
        }

        const review = await ReviewModel.create(req.body);
        res.status(201).json(review);
    } 
    catch(error){
        next (error);
    }

});

router.get("/", async (_req, res, next) => {
    try{
        const reviews = await ReviewModel.find().sort({createdAt: -1});
        res.status(200).json(reviews);
    }
    catch (error){
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const result = reviewQuerySchema.safeParse(req.query);
        if (!result.success) {
            res.status(400).json({
                message: "Invalid query parameters",
                errors: result.error.issues,
            });
            return;
        }

        const reviews = await ReviewModel.find(result.data).sort({createdAt: -1});
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }

});

router.put("/:reviewId", validateUpdateReview, async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;

        if (
            typeof reviewId !== "string" ||
            !/^[0-9a-fA-F]{24}$/.test(reviewId)
        ) {
            res.status(400).json({ message: "Invalid review ID" });
            return;
        }

        const review = await ReviewModel.findByIdAndUpdate(
            reviewId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!review) {
            res.status(404).json({ message: "Review not found" });
            return;
        }

        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

router.delete("/:reviewId", async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        
        if(
            typeof reviewId !== "string" ||
            !/^[0-9a-fA-F]{24}$/.test(reviewId)
        ) {
            res.status(400).json({ message: "Invalid review ID" });
            return;
        }

    const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);

    if (!deletedReview) {
        res.status(404).json({ message: "Review not found" });
        return;
    }

   res.status(204).send();
} catch (error) {
    next(error);
}
});

export default router;