import type {RequestHandler} from "express";
import {createReviewSchema} from "../schemas/review.schema";
import { updateReviewSchema } from "../schemas/review.schema";


export const validateCreateReview: RequestHandler = (req, res,next) =>
{

    const result = createReviewSchema.safeParse(req.body);

    if(!result.success)
         {

        res.status(400).json({
            message: "Invalid review data",
            errors: result.error.issues,

        })   
        return;
     }
     req.body = result.data;
     next();
};

export const validateUpdateReview: RequestHandler = (req,res,next) =>{
    const result = updateReviewSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({
            message:"Invalid review data",
            errors: result.error.issues
,        });

        return;
    }

    req.body = result.data;
    next();
}