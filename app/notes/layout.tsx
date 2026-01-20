import { Suspense } from 'react'; 
import Sidebar from '@/components/SidebarNotes/SidebarNotes';
import css from './LayoutNotes.module.css';

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <Suspense fallback={<div>Loading sidebar...</div>}>
          <Sidebar />
        </Suspense>
      </aside>
      <div className={css.notesWrapper}>
        <Suspense fallback={<div>Loading content...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}