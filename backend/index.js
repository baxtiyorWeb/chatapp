const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
// app express
const app = express();
app.use(cors());

// app.use(express.json());

// { origin: true }

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User With ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("listen server ");
});
