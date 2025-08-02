import React from "react";

type ToolbarProps = {
  onCreate: () => void;
  search: string;
  setSearch: (val: string) => void;
};

export function Toolbar({ onCreate, search, setSearch }: ToolbarProps) {
  return (
    <div className="w-full flex items-center justify-between gap-4 px-4 py-2 bg-secondary border-b border-gray-200">
      <button
        className="bg-primary hover:bg-primary/90 text-white py-1 px-4 rounded transition font-medium"
        onClick={onCreate}
        aria-label="Create new note"
      >
        New Note
      </button>
      <input
        className="rounded border border-gray-200 px-3 py-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-primary bg-white text-black"
        type="search"
        placeholder="Search notes…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
