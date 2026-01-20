'use client';

import Link from 'next/link';
import { NoteData } from '@/types/note';
import css from './NoteDetails.module.css';

export default function NoteDetails({ note }: { note: NoteData }) {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <Link href="/notes/filter/all" className={css.backBtn}>← Back to list</Link>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <div className={css.date}>
            Created: {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'N/A'}
          </div>
        </div>
      </div>
    </main>
  );
}