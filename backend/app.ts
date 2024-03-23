import express from "express";
import freelancerRoutes from "./src/routes/freelancerRoutes";
import clientRoutes from "./src/routes/clientRoutes";
import cors from "cors"
import bodyParser from "body-parser";
require("dotenv").config();
import { connectDB } from "./config/mongoConfig";
const app = express();
const PORT = 3000; // Default port is 3000, but can be overridden by environment variable

// Middleware setup, body parser, etc.

connectDB()

// Increase the limit for JSON bodies
app.use(bodyParser.json({ limit: '10mb' }));

// Increase the limit for URL-encoded bodies
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET,PUT,PATCH,POST,DELETE",],
      credentials: true,
    })
);


// Routes
app.use("/api/freelancers", freelancerRoutes);
app.use("/api/client", clientRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
