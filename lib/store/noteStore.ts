import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NoteDraft {
  title: string;
  content: string;
  tag: string;
}

interface NoteHubState {
  noteDraft: NoteDraft;
  updateDraft: (fields: Partial<NoteDraft>) => void;
  resetDraft: () => void;
}

const initialNoteState: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteHubState>()(
  persist(
    (set) => ({
      noteDraft: initialNoteState,
      updateDraft: (fields) =>
        set((state) => ({
          noteDraft: { ...state.noteDraft, ...fields },
        })),
      resetDraft: () => set({ noteDraft: initialNoteState }),
    }),
    {
      name: "notehub-pending-item",
    },
  ),
);
