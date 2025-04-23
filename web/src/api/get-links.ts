import { api } from "../lib/axios";

export interface GetLinksResponse {
  links:
    | {
        id: string;
        name: string;
        originalUrl: string;
        accessCounter: string;
        createdAt: Date;
      }[]
    | [];
}

export async function getLinks() {
  const response = await api.get<GetLinksResponse>("links");

  return response.data;
}
