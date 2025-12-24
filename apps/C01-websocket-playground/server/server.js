import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

wss.on("connection", (socket) => {
  console.log("Client connected");

  // Send welcome
  socket.send(
    JSON.stringify({
      type: "system",
      message: "Connected to WebSocket server",
    })
  );

  // Send server message every second
  const interval = setInterval(() => {
    socket.send(
      JSON.stringify({
        type: "tick",
        time: new Date().toLocaleTimeString(),
      })
    );
  }, 1000);

  socket.on("message", (data) => {
    const msg = data.toString();
    console.log("Received:", msg);

    // Echo back
    socket.send(
      JSON.stringify({
        type: "echo",
        message: msg,
      })
    );
  });

  socket.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });

  socket.on("error", (err) => {
    console.error("Socket error", err);
  });
});
