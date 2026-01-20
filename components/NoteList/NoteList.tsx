'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import { deleteNote } from '@/lib/api'; 
import { NoteData } from '@/types/note';
import css from './NoteList.module.css';

export default function NoteList({ notes }: { notes: NoteData[] }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      mutation.mutate(id);
    }
  };

  if (notes.length === 0) return <p className={css.empty}>No notes found.</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content.substring(0, 150)}...</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <div className={css.actions}>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View Details
              </Link>
              <button 
                onClick={() => handleDelete(note.id)}
                className={css.deleteBtn}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? '...' : 'Delete'}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}