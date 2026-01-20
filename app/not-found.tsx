import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Сторінку не знайдено | NoteHub",
  description:
    "На жаль, такої сторінки не існує. Поверніться до своїх нотаток.",
  openGraph: {
    title: "Помилка 404 — NoteHub",
    description: "Сторінку не знайдено.",
    images: [
      { url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" },
    ],
  },
};

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1>404 - Сторінку не знайдено</h1>
      <p>Вибачте, але ми не змогли знайти те, що ви шукали.</p>
      <Link
        href="/notes/filter/all"
        style={{ color: "#000", textDecoration: "underline" }}
      >
        Повернутися до нотаток
      </Link>
    </div>
  );
}
