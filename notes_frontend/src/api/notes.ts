import { Note, NoteInput } from "@/types/note";

const API_BASE = process.env.NEXT_PUBLIC_NOTES_API_URL || ""; // Set backend endpoint here

// Placeholder: uses localStorage for demo purposes.
// Swap out each function's implementation with real HTTP calls when backend is ready

const STORAGE_KEY = "notes-demo-list";

// PUBLIC_INTERFACE
export async function fetchNotes(): Promise<Note[]> {
  if (API_BASE) {
    const r = await fetch(`${API_BASE}/notes`);
    if (!r.ok) throw new Error("Failed to get notes");
    return r.json();
  }
  // Local fallback
  const data = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  return data ? JSON.parse(data) : [];
}

// PUBLIC_INTERFACE
export async function fetchNote(id: string): Promise<Note | undefined> {
  if (API_BASE) {
    const r = await fetch(`${API_BASE}/notes/${id}`);
    if (!r.ok) throw new Error("Not found");
    return r.json();
  }
  const notes = await fetchNotes();
  return notes.find((n) => n.id === id);
}

// PUBLIC_INTERFACE
export async function createNote(note: NoteInput): Promise<Note> {
  if (API_BASE) {
    const r = await fetch(`${API_BASE}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    if (!r.ok) throw new Error("Failed to create");
    return r.json();
  }
  const notes = await fetchNotes();
  const newNote: Note = {
    id: Math.random().toString(36).slice(2),
    ...note,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  const newList = [newNote, ...notes];
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  return newNote;
}

// PUBLIC_INTERFACE
export async function updateNote(id: string, input: NoteInput): Promise<Note> {
  if (API_BASE) {
    const r = await fetch(`${API_BASE}/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!r.ok) throw new Error("Failed to update");
    return r.json();
  }
  const notes = await fetchNotes();
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) throw new Error("Not found");
  const updatedNote = {
    ...notes[idx],
    ...input,
    updated_at: new Date().toISOString(),
  };
  const updatedNotes = notes.toSpliced(idx, 1, updatedNote); // ES2023: immutable splice
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  return updatedNote;
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string): Promise<void> {
  if (API_BASE) {
    const r = await fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" });
    if (!r.ok) throw new Error("Failed to delete");
    return;
  }
  const notes = (await fetchNotes()).filter((n) => n.id !== id);
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
