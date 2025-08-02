export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// PUBLIC_INTERFACE
export type NoteInput = Omit<Note, "id" | "created_at" | "updated_at">;
