import {model, Schema, type InferSchemaType } from "mongoose";


const reviewSchema = new Schema(
    {

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        spotifyAlbumId: {
            type: String,
            required: true,
            trim: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

         text: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 1000,
        },
        listenedAt: {
            type: Date,
            required: true,
        },

     },

    {timestamps: true}

    );

    export type Review = InferSchemaType<typeof reviewSchema>;

    const ReviewModel = model ("Review", reviewSchema);
    export default ReviewModel;