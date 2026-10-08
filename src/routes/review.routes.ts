import {Router } from "express";
import ReviewModel from "../models/review.model";
import UserModel from "../models/user.model";
import { validateCreateReview } from "../middleware/validate";

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

export default router;