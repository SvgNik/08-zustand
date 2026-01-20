'use client';

import { useState, useEffect } from 'react'; // Додано useState та useEffect
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'; // Потрібно для дебаунсу
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from './NotesPage.module.css';

export default function NotesPage({ initialFilter }: { initialFilter: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 1. Внутрішній стан для пошуку та сторінки (вимога ментора)
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  // 2. Дебаунс для пошуку, щоб не спамити запитами
  const [debouncedSearch] = useDebounce(search, 500);

  // 3. Синхронізація стану з URL (щоб працювала кнопка "Назад" та перехід по лінку)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }
    
    params.set('page', page.toString());
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, page, pathname, router, searchParams]);

  // 4. Функція обробки пошуку, якої не вистачало (виправляє помилку Build)
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Скидаємо на 1 сторінку при новому пошуку
  };

  // 5. Використання дебаунснутого значення в useQuery
  const { data, isLoading } = useQuery({
    queryKey: ['notes', initialFilter, debouncedSearch, page],
    queryFn: () => fetchNotes({ 
      tag: initialFilter, 
      search: debouncedSearch, 
      page: page, 
      perPage: 6 
    }),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Оновлюємо внутрішній стан сторінки
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        {/* Тепер ці пропси передаються коректно */}
        <SearchBox value={search} onChange={handleSearchChange} />
        <Link href="/notes/action/create" className={css.button}>Create note +</Link>
      </div>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : data && (
        <>
          <NoteList notes={data.notes} />
          <Pagination 
            current={page} 
            total={data.totalPages} 
            onChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
}