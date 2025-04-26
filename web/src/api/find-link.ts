import { api } from "../lib/axios";

export interface FindLinkResponse {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: string;
  createdAt: Date;
}

export async function findLink(name: string) {
  const result = await api.get<FindLinkResponse>(`/links/${name}`);

  return result.data;
}
