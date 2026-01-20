// 'use client';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import css from './Modal.module.css';

// export default function Modal({ children }: { children: React.ReactNode }) {
//   const router = useRouter();

//   const handleClose = () => router.back();

//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') handleClose();
//     };
//     window.addEventListener('keydown', handleEsc);
//     return () => window.removeEventListener('keydown', handleEsc);
//   }, []);

//   return (
//     <div className={css.backdrop} onClick={handleClose}>
//       <div className={css.modal} onClick={(e) => e.stopPropagation()}>
//         <button className={css.closeBtn} onClick={handleClose} aria-label="Close">
//           &times;
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// }

// components/Modal/Modal.tsx
'use client';
import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void; 
}

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={handleClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}