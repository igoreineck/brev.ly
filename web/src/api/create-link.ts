import { api } from "../lib/axios";

export interface CreateLinkBody {
  name: string;
  originalUrl: string;
}

interface CreateLinkResponse {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: string;
  createdAt: Date;
}

export async function createLink({ name, originalUrl }: CreateLinkBody) {
  await api.post<CreateLinkResponse>("/links", {
    name,
    originalUrl,
  });
}
