import css from './Pagination.module.css';

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({ current, total, onChange }: Props) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav>
      <ul className={css.pagination}>
        {pages.map((p) => (
          <li 
            key={p} 
            className={`${css.item} ${p === current ? css.active : ''}`} 
            onClick={() => onChange(p)}
          >
            {p}
          </li>
        ))}
      </ul>
    </nav>
  );
}