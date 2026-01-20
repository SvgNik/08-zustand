"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import css from "@/components/NotesPage/NotesPage.module.css";

export default function Notes({ initialFilter }: { initialFilter: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch] = useDebounce(search, 500);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) params.set("search", debouncedSearch);
    else params.delete("search");

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, pathname, router, searchParams]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", initialFilter, debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        tag: initialFilter,
        search: debouncedSearch,
        page,
        perPage: 6,
      }),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (isError)
    return (
      <div className={css.app}>
        <p>Error loading notes.</p>
      </div>
    );

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <h2 className={css.pageTitle}>
          {initialFilter === "all" ? "Усі записи" : `${initialFilter} Notes`}
        </h2>
        <div className={css.controls}>
          <SearchBox value={search} onChange={handleSearchChange} />
          <Link href="/notes/action/create">
            <button className={css.button}>+ Add Note</button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className={css.loader}>Завантаження...</div>
      ) : (
        <>
          <NoteList notes={data?.notes || []} />
          <Pagination
            current={page}
            total={data?.totalPages || 1}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
}
