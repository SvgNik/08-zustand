'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import css from './SidebarNotes.module.css';
import clsx from 'clsx'; 

const TAGS = ['all', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function Sidebar() {
  const params = useParams();
  const searchParams = useSearchParams();

  const currentTag = params.slug?.[0] || 'all';
  
  const searchQuery = searchParams.get('search');

  return (
    <aside className={css.menuList}>
      {TAGS.map((tag) => {
        const normalizedTag = tag.toLowerCase();
        const isActive = currentTag === normalizedTag;
        const href = searchQuery 
          ? `/notes/filter/${normalizedTag}?search=${searchQuery}`
          : `/notes/filter/${normalizedTag}`;

        return (
          <div key={tag} className={css.menuItem}>
            <Link 
              href={href} 
              className={clsx(css.menuLink, { [css.active]: isActive })}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Link>
          </div>
        );
      })}
    </aside>
  );
}