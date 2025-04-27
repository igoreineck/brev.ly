import { api } from "../lib/axios";

interface DeleteLinkResponse {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: string;
  createdAt: Date;
}

export async function deleteLink(id: string) {
  await api.delete<DeleteLinkResponse>(`/links/${id}`);
}
