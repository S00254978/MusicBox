import { Router } from "express";
import UserModel from "../models/user.model";
import { validateCreateUser } from "../middleware/validate";

const router = Router();

router.post("/",validateCreateUser, async (req,res,next) => {

    try{
        const user = await UserModel.create(req.body)
        res.status(201).json(user);
    } 
    
    catch (error) {
        next(error);
    }

});

export default router;