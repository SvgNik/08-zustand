"use client";

import { useNoteStore } from "@/lib/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const { noteDraft, updateDraft, resetDraft } = useNoteStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const noteCreation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      resetDraft();
      router.back();
    },
    onError: (error) => {
      console.error("Failed to create note:", error);
      alert("Виникла помилка при створенні нотатки.");
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    updateDraft({ [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    noteCreation.mutate(noteDraft);
  };

  return (
    <form className={css.form} onSubmit={handleFormSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title" className={css.label}>
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          placeholder="Enter note title..."
          value={noteDraft.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content" className={css.label}>
          Content
        </label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          placeholder="Write your thoughts here..."
          rows={6}
          value={noteDraft.content}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag" className={css.label}>
          Category
        </label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={noteDraft.tag}
          onChange={handleInputChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={noteCreation.isPending}
        >
          {noteCreation.isPending ? "Processing..." : "Save Note"}
        </button>
      </div>
    </form>
  );
}
