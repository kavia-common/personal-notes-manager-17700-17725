import React from "react";
import { Note } from "@/types/note";

type NoteSidebarProps = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  search: string;
};

export function NoteSidebar({ notes, selectedId, onSelect, search }: NoteSidebarProps) {
  const filtered = React.useMemo(
    () =>
      notes.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase())
      ),
    [notes, search]
  );

  return (
    <aside className="h-full bg-secondary border-r border-gray-200 w-72 min-w-[200px] max-w-xs flex flex-col overflow-y-auto">
      <nav className="flex-1 flex flex-col">
        {filtered.length === 0 && (
          <span className="text-gray-400 text-center mt-8">No notes found</span>
        )}
        {filtered.map((note) => (
          <button
            key={note.id}
            className={`text-left px-4 py-3 border-b border-gray-100 hover:bg-primary/10
            ${selectedId === note.id ? "bg-primary/10 border-l-4 border-primary font-bold text-primary" : "text-gray-800"}
            `}
            aria-current={selectedId === note.id}
            onClick={() => onSelect(note.id)}
          >
            <div className="truncate">{note.title || <span className="italic text-gray-400">Untitled</span>}</div>
            <div className="text-xs text-gray-400 truncate">
              {note.content.substring(0, 60)}{note.content.length > 60 && "..."}
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}
