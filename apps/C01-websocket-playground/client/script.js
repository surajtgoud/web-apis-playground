const statusEl = document.getElementById("status");
const logEl = document.getElementById("log");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const closeBtn = document.getElementById("closeBtn");

let socket;

// Helper to log messages
function log(text, type = "info") {
  const li = document.createElement("li");
  li.textContent = text;
  li.className = type;
  logEl.prepend(li);
}

// Connect
function connect() {
  socket = new WebSocket("ws://localhost:8080");

  statusEl.textContent = "Connecting…";

  socket.addEventListener("open", () => {
    statusEl.textContent = "Connected";
    statusEl.className = "status open";
    log("Socket opened", "system");
  });

  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "tick") {
      log(`Server time: ${data.time}`);
    } else if (data.type === "echo") {
      log(`Echo: ${data.message}`, "echo");
    } else {
      log(data.message, "system");
    }
  });

  socket.addEventListener("close", () => {
    statusEl.textContent = "Disconnected";
    statusEl.className = "status closed";
    log("Socket closed", "system");
  });

  socket.addEventListener("error", () => {
    statusEl.textContent = "Error";
    statusEl.className = "status error";
    log("Socket error", "error");
  });
}

sendBtn.addEventListener("click", () => {
  if (socket.readyState !== WebSocket.OPEN) return;
  const msg = input.value.trim();
  if (!msg) return;
  socket.send(msg);
  input.value = "";
});

closeBtn.addEventListener("click", () => {
  socket.close();
});

// Start
connect();
