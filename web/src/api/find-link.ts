import { api } from "../lib/axios";

interface FindLinkParams {
  name: string;
}

export interface FindLinkResponse {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: string;
  createdAt: Date;
}

export async function findLink({ name }: FindLinkParams) {
  const result = await api.get<FindLinkResponse>("/links", {
    params: {
      name,
    },
  });

  return result.data;
}
