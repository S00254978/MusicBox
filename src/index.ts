import "dotenv/config";
import express from "express";

const app = express();
app.use(express.json());
    
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));