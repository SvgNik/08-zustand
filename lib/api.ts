import axios from "axios";
import { NoteData } from "@/types/note";
import {
  FetchNotesParams,
  FetchNotesResponse,
  CreateNotePayload,
} from "@/types/api";

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

api.interceptors.request.use((config) => {
  if (API_TOKEN) {
    config.headers.Authorization = `Bearer ${API_TOKEN}`;
  }
  return config;
});

export const fetchNotes = async ({
  page = 1,
  perPage = 6,
  search = "",
  tag = "all",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  try {
    const normalizedTag =
      tag === "all"
        ? undefined
        : tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();

    const { data } = await api.get<FetchNotesResponse>("/notes", {
      params: {
        page,
        perPage,
        search: search.trim() || undefined,
        tag: normalizedTag,
      },
    });

    return data;
  } catch (error) {
    console.error("Fetch notes error:", error);
    return { notes: [], totalPages: 0 };
  }
};

export const fetchNoteById = async (id: string): Promise<NoteData> => {
  const { data } = await api.get<NoteData>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  noteData: CreateNotePayload,
): Promise<NoteData> => {
  const { data } = await api.post<NoteData>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
