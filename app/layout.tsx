import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const robotoFont = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-main",
});

export const metadata: Metadata = {
  title: "NoteHub — Твій персональний цифровий блокнот",
  description: "Організовуйте свої думки та завдання ефективно з NoteHub.",
  openGraph: {
    title: "NoteHub — Розумне керування нотатками",
    description: "Зберігайте важливе в одному місці.",
    url: "https://notehub-client.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={robotoFont.variable}>
      <body style={{ fontFamily: "var(--font-main), sans-serif" }}>
        <TanStackProvider>
          <Header />
          <main style={{ minHeight: "85vh" }}>{children}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
