import express from "express";
import reviewRoutes from "./routes/review.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.get("/",(req,res) => {
    res.send("Hello world!")
});
app.use("/api/reviews", reviewRoutes);
app.use(errorHandler);
export default app;