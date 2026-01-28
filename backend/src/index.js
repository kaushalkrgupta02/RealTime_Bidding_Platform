import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import itemRoutes from "./routes/itemsRoutes.js";
import { auctionSocket } from "./sockets/auction.js";

const app = express();

const isDevelopment = process.env.NODE_ENV !== "production";
const frontendUrl = isDevelopment
  ? process.env.FRONTEND_URL_LOCAL || "http://localhost:5173"
  : process.env.FRONTEND_URL_PRODUCTION || "http://localhost:5173";

console.log("Frontend URL:", frontendUrl);

app.use(cors({
  origin: [frontendUrl, "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/items", itemRoutes);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [frontendUrl, "http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => auctionSocket(io, socket));

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
