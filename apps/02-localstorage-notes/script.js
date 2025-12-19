// ===== Storage key (namespaced so it won't collide with other projects)
const STORAGE_KEY = "web-apis-playground:notes:v1";

// ===== DOM
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const addBtn = document.getElementById("addBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const notesList = document.getElementById("notesList");
const emptyState = document.getElementById("emptyState");
const countBadge = document.getElementById("countBadge");

// ===== State (in-memory)
let notes = loadNotes();

// ===== Helpers: safe JSON
function safeJsonParse(maybeJson, fallback) {
  try {
    return JSON.parse(maybeJson);
  } catch {
    return fallback;
  }
}

// ===== Load from localStorage
function loadNotes() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const parsed = safeJsonParse(raw, []);
  // Defensive: ensure it's an array
  return Array.isArray(parsed) ? parsed : [];
}

// ===== Save to localStorage
function saveNotes(nextNotes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextNotes));
}

// ===== Create note object
function makeNote({ title, content }) {
  return {
    id: crypto.randomUUID(), // modern unique id
    title: title?.trim() || "Untitled",
    content: content.trim(),
    createdAt: Date.now(),
  };
}

// ===== Render UI
function render() {
  notesList.innerHTML = "";

  countBadge.textContent = String(notes.length);

  if (notes.length === 0) {
    emptyState.style.display = "block";
    return;
  } else {
    emptyState.style.display = "none";
  }

  // Newest first
  const sorted = [...notes].sort((a, b) => b.createdAt - a.createdAt);

  for (const note of sorted) {
    const li = document.createElement("li");
    li.className = "note";

    const titleEl = document.createElement("p");
    titleEl.className = "noteTitle";
    titleEl.textContent = note.title;

    const metaEl = document.createElement("p");
    metaEl.className = "noteMeta";
    metaEl.textContent = `Created: ${new Date(
      note.createdAt
    ).toLocaleString()}`;

    const contentEl = document.createElement("p");
    contentEl.className = "noteContent";
    contentEl.textContent = note.content;

    const actions = document.createElement("div");
    actions.className = "noteActions";

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", async () => {
      // We'll fully cover Clipboard API later, but here’s a quick safe try
      try {
        await navigator.clipboard.writeText(note.content);
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy"), 800);
      } catch {
        alert("Clipboard permission blocked. (We’ll handle fallbacks later.)");
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    actions.append(copyBtn, deleteBtn);
    li.append(titleEl, metaEl, contentEl, actions);
    notesList.appendChild(li);
  }
}

// ===== Actions
function addNote() {
  const title = titleInput.value;
  const content = contentInput.value;

  if (!content.trim()) {
    contentInput.focus();
    return;
  }

  const newNote = makeNote({ title, content });
  notes = [newNote, ...notes]; // add to front

  saveNotes(notes);
  render();

  titleInput.value = "";
  contentInput.value = "";
  contentInput.focus();
}

function deleteNote(id) {
  notes = notes.filter((n) => n.id !== id);
  saveNotes(notes);
  render();
}

function clearAll() {
  const ok = confirm("Delete ALL notes? This cannot be undone.");
  if (!ok) return;

  notes = [];
  localStorage.removeItem(STORAGE_KEY);
  render();
}

// ===== Events
addBtn.addEventListener("click", addNote);

// Enter to add (Ctrl+Enter for textarea is a nice pattern)
contentInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    addNote();
  }
});

clearAllBtn.addEventListener("click", clearAll);

// Initial render
render();
