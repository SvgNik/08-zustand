import { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client'; 
import css from './NoteDetails.module.css';
import Link from 'next/link';
import { NoteData } from '@/types/note';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const note = await fetchNoteById(id);
    const title = `${note.title} | NoteHub`;
    const description = note.content.slice(0, 150) || 'View note details on NoteHub';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://your-domain.com/notes/${id}`, 
        type: 'article',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    return { 
      title: 'Note Details',
      description: 'The requested note could not be found.'
    };
  }
}

export default async function NoteDetailPage({ params }: Props) {
  const { id } = await params;
  
  if (!id || id === 'undefined') return null;
  let note: NoteData | null = null;

  try {
    note = await fetchNoteById(id);
  } catch {
    return (
      <main className={css.main}>
        <div className={css.container}>
          <h2>Note not found</h2>
          <Link href="/notes/filter/all" className={css.backBtn}>← Back to list</Link>
        </div>
      </main>
    );
  }
  
  return <NoteDetails note={note} />;
}