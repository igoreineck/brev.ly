import { api } from "../lib/axios";

interface IncrementLinkAccessResponse {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: string;
  createdAt: Date;
}

export async function incrementLinkAccess(id: string) {
  await api.post<IncrementLinkAccessResponse>(`/links/${id}/increment-counter`);
}
