import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  modal?: ReactNode;
}

export default function FilterLayout({ children, modal }: LayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}