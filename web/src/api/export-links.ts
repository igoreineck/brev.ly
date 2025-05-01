import { api } from "@/lib/axios";

interface ExportLinksResponse {
  reportUrl: string;
}

export async function exportLinks() {
  const result = await api.post<ExportLinksResponse>("/links/export");

  return result.data;
}
