import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

export default async function NoteModal({ params }: { params: { id?: string } }) {
  if (!params?.id || params.id === 'undefined') return null;

  let note = null;

  try {
    note = await fetchNoteById(params.id);
  } catch (error) {
    console.error("Fetch error:", error);
    return null; 
  }

  if (!note) return null;

 
  return (
    <Modal>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </Modal>
  );
}

