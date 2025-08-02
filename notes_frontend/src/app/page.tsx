"use client";
import React from "react";
import { Toolbar } from "@/components/Toolbar";
import { NoteSidebar } from "@/components/NoteSidebar";
import { NoteEditor } from "@/components/NoteEditor";
import { NoteView } from "@/components/NoteView";
import {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
} from "@/api/notes";
import { Note, NoteInput } from "@/types/note";

export default function HomePage() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [editMode, setEditMode] = React.useState<"none" | "create" | "edit">("none");
  const [search, setSearch] = React.useState("");
  const [currentNote, setCurrentNote] = React.useState<Note | null>(null);

  // Initial fetch and whenever changed
  React.useEffect(() => {
    fetchNotes()
      .then(setNotes)
      .catch((e: unknown) => {
        if (e instanceof Error) setError(e.message);
        else setError("Error loading notes");
      });
  }, []);

  // Handle selection and data fetch
  React.useEffect(() => {
    if (selectedNoteId) {
      setLoading(true);
      fetchNote(selectedNoteId)
        .then((n) => {
          setCurrentNote(n || null);
          setEditMode("none");
          setLoading(false);
        })
        .catch(() => {
          setCurrentNote(null);
          setLoading(false);
        });
    } else {
      setCurrentNote(null);
      setEditMode("none");
    }
  }, [selectedNoteId]);

  const handleCreate = async (data: NoteInput) => {
    setLoading(true);
    setError(null);
    try {
      const n = await createNote(data);
      setNotes([n, ...notes]);
      setSelectedNoteId(n.id);
      setEditMode("none");
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Error creating note");
    }
    setLoading(false);
  };

  const handleUpdate = async (data: NoteInput) => {
    if (!currentNote) return;
    setLoading(true);
    setError(null);
    try {
      const n = await updateNote(currentNote.id, data);
      setNotes(
        notes.map((note) => (note.id === n.id ? { ...note, ...n } : note))
      );
      setCurrentNote(n);
      setEditMode("none");
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Error updating note");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!currentNote) return;
    setLoading(true);
    setError(null);
    try {
      await deleteNote(currentNote.id);
      setNotes(notes.filter((note) => note.id !== currentNote.id));
      setSelectedNoteId(null);
      setCurrentNote(null);
      setEditMode("none");
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Error deleting note");
    }
    setLoading(false);
  };

  // Main layout
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Toolbar */}
      <Toolbar
        onCreate={() => {
          setEditMode("create");
          setCurrentNote(null);
          setSelectedNoteId(null);
        }}
        search={search}
        setSearch={setSearch}
      />
      {/* Main content: Sidebar + Note area */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <NoteSidebar
          notes={notes}
          selectedId={selectedNoteId}
          onSelect={(id) => {
            setSelectedNoteId(id);
            setEditMode("none");
          }}
          search={search}
        />
        {/* Main area */}
        <main className="flex-1 min-w-0 flex flex-col">
          {editMode === "create" ? (
            <NoteEditor
              note={null}
              isNew
              onSave={(data) => handleCreate(data)}
              onDelete={() => setEditMode("none")}
              onCancel={() => setEditMode("none")}
              loading={loading}
              error={error}
            />
          ) : editMode === "edit" && currentNote ? (
            <NoteEditor
              note={currentNote}
              isNew={false}
              onSave={(data) => handleUpdate(data)}
              onDelete={handleDelete}
              onCancel={() => setEditMode("none")}
              loading={loading}
              error={error}
            />
          ) : (
            <>
              <div className="flex justify-end px-8 pt-4">
                {currentNote && (
                  <button
                    className="text-primary hover:underline px-2"
                    onClick={() => setEditMode("edit")}
                    aria-label="Edit note"
                  >
                    Edit
                  </button>
                )}
              </div>
              <NoteView note={currentNote} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
