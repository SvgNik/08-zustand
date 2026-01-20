import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" className={css.headerLink}>NoteHub</Link>
      <nav>
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/notes/filter/all" className={css.navigationLink}>My Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}