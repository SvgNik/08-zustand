"use client"; 

import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal'; 

interface NotePreviewProps {
  params: { id: string };
}

export default function NotePreview({ params }: NotePreviewProps) {
  const router = useRouter();
  const id = params?.id;
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  const handleClose = () => router.back();

  if (isLoading || !note) return null;

  return (
    <Modal onClose={handleClose}>
      <div style={{ padding: '8px', color: 'black' }}>
        <h2 style={{ marginBottom: '12px' }}>{note.title}</h2>
        <p style={{ lineHeight: '1.5', color: '#333' }}>{note.content}</p>
        
        <button 
          onClick={handleClose} 
          style={{ 
            marginTop: '20px', 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer' 
          }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}