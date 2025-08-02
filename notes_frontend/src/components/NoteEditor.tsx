import React, { useEffect, useRef } from "react";
import { Note, NoteInput } from "@/types/note";

type NoteEditorProps = {
  note: Note | null;
  isNew?: boolean;
  onSave: (data: NoteInput) => void;
  onDelete: () => void;
  onCancel: () => void;
  loading: boolean;
  error: string | null;
};

export function NoteEditor({
  note,
  isNew,
  onSave,
  onDelete,
  onCancel,
  loading,
  error
}: NoteEditorProps) {
  const [title, setTitle] = React.useState(note?.title || "");
  const [content, setContent] = React.useState(note?.content || "");
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    titleInputRef.current?.focus();
  }, [note?.id, isNew, note?.title, note?.content]);

  return (
    <div className="flex flex-col h-full w-full gap-4 p-6 max-w-2xl mx-auto">
      <input
        ref={titleInputRef}
        className="text-2xl font-bold px-1 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary mb-2"
        type="text"
        placeholder="Title"
        value={title}
        maxLength={80}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />
      <textarea
        className="flex-1 min-h-[200px] px-1 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
        placeholder="Start writing your note…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />
      <div className="flex gap-2 mt-auto items-center">
        <button
          className="bg-primary hover:bg-primary/80 text-white font-semibold px-5 py-2 rounded transition disabled:opacity-60"
          disabled={loading}
          onClick={() => onSave({ title, content })}
        >
          Save
        </button>
        {!isNew && (
          <button
            className="bg-accent hover:bg-accent/80 text-white font-semibold px-4 py-2 rounded"
            onClick={onDelete}
            disabled={loading}
          >
            Delete
          </button>
        )}
        <button
          className="ml-auto underline underline-offset-2 text-gray-500 px-2"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
      {error && <div className="text-red-500 py-1">{error}</div>}
    </div>
  );
}
