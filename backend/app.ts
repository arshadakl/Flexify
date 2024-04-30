import express from "express";
import freelancerRoutes from "./src/routes/freelancerRoutes";
import clientRoutes from "./src/routes/clientRoutes";
import adminRoutes from "./src/routes/adminRouter";
import cors from "cors"
import http from "http";
import bodyParser from "body-parser";
require("dotenv").config();
import { connectDB } from "./config/mongoConfig";
import configCloudinary from "./src/utils/Cloudinary";
import helmet from "helmet";
import { initializeSocket } from "./src/utils/Socket";

const app = express();
const PORT = 3000; 

connectDB()

const server = http.createServer(app);
const io = initializeSocket(server);


app.use(bodyParser.json({ limit: '150mb' }));
configCloudinary()

app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));

app.use(
    cors({
      origin: ["http://localhost:5173",],
      methods: ["GET,PUT,PATCH,POST,DELETE",],
      credentials: true,
    })
);

app.use(helmet());


// Routes
app.use("/api/freelancers", freelancerRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/admin",adminRoutes );


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
