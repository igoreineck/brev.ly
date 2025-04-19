import { api } from "../lib/axios";

interface IncrementLinkAccessParams {
  id: string;
}

interface IncrementLinkAccessResponse {
  id: string;
  name: string;
  originalUrl: string;
  accessCounter: string;
  createdAt: Date;
}

// @TODO: review if this works
export async function incrementLinkAccess({ id }: IncrementLinkAccessParams) {
  const result = await api.post<IncrementLinkAccessResponse>(
    "/links/:id/increment-counter",
    {
      params: {
        id,
      },
    }
  );

  return result.data;
}
