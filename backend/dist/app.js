"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const freelancerRoutes_1 = __importDefault(require("./src/routes/freelancerRoutes"));
const clientRoutes_1 = __importDefault(require("./src/routes/clientRoutes"));
const adminRouter_1 = __importDefault(require("./src/routes/adminRouter"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv").config();
const mongoConfig_1 = require("./config/mongoConfig");
const Cloudinary_1 = __importDefault(require("./src/utils/Cloudinary"));
const helmet_1 = __importDefault(require("helmet"));
const Socket_1 = require("./src/utils/Socket");
const app = (0, express_1.default)();
const PORT = 4000;
(0, mongoConfig_1.connectDB)();
const server = http_1.default.createServer(app);
const io = (0, Socket_1.initializeSocket)(server);
app.use(body_parser_1.default.json({ limit: '150mb' }));
(0, Cloudinary_1.default)();
app.use(body_parser_1.default.urlencoded({ limit: '150mb', extended: true }));
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    methods: ["GET,PUT,PATCH,POST,DELETE"],
    credentials: true,
}));
app.use((0, helmet_1.default)());
// Routes
app.use("/api/freelancers", freelancerRoutes_1.default);
app.use("/api/client", clientRoutes_1.default);
app.use("/api/admin", adminRouter_1.default);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
