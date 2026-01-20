export interface NoteData {
  id: string
  title: string
  content: string
  tag: string
  createdAt: string
}

export interface FetchNotesParams {
  page?: number
  perPage?: number
  search?: string
  tag?: string
}

export interface FetchNotesResponse {
  notes: NoteData[]
  totalPages: number
}
