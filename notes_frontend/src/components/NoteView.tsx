import React from "react";
import { Note } from "@/types/note";

type NoteViewProps = {
  note: Note | null;
};

export function NoteView({ note }: NoteViewProps) {
  if (!note)
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a note to view, or create a new one.
      </div>
    );
  return (
    <div className="flex flex-col h-full w-full gap-4 p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold break-words">{note.title || <span className="italic text-gray-400">Untitled</span>}</h2>
      <div className="whitespace-pre-wrap break-words flex-1 text-gray-800 border-t pt-4 border-gray-100">{note.content}</div>
      <div className="text-xs text-gray-400 mt-auto">
        Last updated: {new Date(note.updated_at).toLocaleString()}
      </div>
    </div>
  );
}
