import { api } from "../lib/axios";

interface DeleteLinkParams {
  id: string;
}

interface DeleteLinkResponse {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: string;
  createdAt: Date;
}

export async function deleteLink({ id }: DeleteLinkParams) {
  const result = await api.delete<DeleteLinkResponse>("/links", {
    params: {
      id,
    },
  });

  return result.data;
}
