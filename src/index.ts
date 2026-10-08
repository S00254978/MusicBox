import "dotenv/config";
import app from "./app";
import mongoose from "mongoose";

const port = 3000;
const mongouri = process.env.MONGODB_URI;


async function startServer() {
    if (!mongouri) {
        throw new Error("MONGODB_URI is not set");
    }

    await mongoose.connect(mongouri);
    console.log("connected to mongodb")
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    });


}

    startServer().catch((error: unknown) => {
        console.error("Failed to start server", error);
        
    });