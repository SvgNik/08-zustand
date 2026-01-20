import Link from "next/link";
import css from "./Home.module.css";

export default function HomePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>NoteHub</h1>
        <p className={css.description}>
          Welcome to your personal second brain. Manage your thoughts and tasks
          efficiently.
        </p>
        <div className={css.actions}>
          <Link href="/notes/filter/all" className={css.link}>
            Go to My Notes
          </Link>
        </div>
      </div>
    </main>
  );
}
