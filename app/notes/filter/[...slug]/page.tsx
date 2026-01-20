import { Metadata } from "next";
import Notes from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] || "all";
  const displayTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  const title = `Категорія: ${displayTag} | NoteHub`;

  return {
    title,
    description: `Перегляд усіх нотаток у розділі ${displayTag}. Ваші ідеї в повному порядку.`,
    openGraph: {
      title,
      description: `Перегляд усіх нотаток у розділі ${displayTag}.`,
      url: `https://notehub-app.vercel.app/notes/filter/${tag}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  const currentFilter = slug[0] || "all";

  return <Notes key={currentFilter} initialFilter={currentFilter} />;
}
