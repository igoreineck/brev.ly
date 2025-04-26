import { api } from "../lib/axios";

type Link = {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: string;
  createdAt: Date;
};

export interface GetLinksResponse {
  links: Link[] | [];
}

export async function getLinks() {
  const response = await api.get<GetLinksResponse>("links");

  return response.data;
}
