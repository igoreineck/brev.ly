import { useMutation, useQuery } from "@tanstack/react-query";
import { getLinks, GetLinksResponse } from "@/api/get-links";
import { Button } from "@/components/ui";
import { DownloadSimple, Spinner, Link } from "phosphor-react";
import { BrevlyLink } from "./brevly-link";
import { exportLinks } from "@/api/export-links";
import { downloadUrl } from "@/utils/download-url";

function BrevlyLinkList() {
  const { data: result, isLoading } = useQuery<GetLinksResponse>({
    queryKey: ["links"],
    queryFn: getLinks,
  });

  if (isLoading) {
    return <div>Lista carregando...</div>;
  }

  if (!result) {
    return (
      <div className="flex justify-center">
        <div className="mt-8">
          <div className="flex justify-center mb-3">
            <Link size={16} />
          </div>
          <p className="text-xs text-gray-500 uppercase">
            Ainda não existem links cadastrados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y-1 divide-gray-200">
      {result.links.map((props) => (
        <BrevlyLink key={props.id} {...props} />
      ))}
    </div>
  );
}

export function BrevlyLinkListContainer() {
  const mutation = useMutation({
    mutationFn: exportLinks,
  });

  async function handleExport() {
    try {
      const { reportUrl } = await mutation.mutateAsync();
      downloadUrl(reportUrl);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="sm:col-span-2 bg-white rounded-xl p-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-600">Meus links</h2>
        <Button
          className="bg-gray-200 rounded-lg text-gray-600 border-gray-200 border-1 hover:bg-gray-200 hover:border-primary cursor-pointer"
          disabled={mutation.isPending}
          onClick={handleExport}
        >
          {mutation.isPending ? (
            <Spinner size={16} />
          ) : (
            <DownloadSimple size={16} />
          )}
          Baixar CSV
        </Button>
      </div>
      <hr className="h-1 text-gray-200" />
      <BrevlyLinkList />
    </div>
  );
}
