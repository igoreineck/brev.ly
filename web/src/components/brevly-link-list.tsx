import { useQuery } from "@tanstack/react-query";
import { getLinks, GetLinksResponse } from "@/api/get-links";
import { Button } from "@/components/ui";
import { DownloadSimpleIcon, LinkIcon } from "@/components/icons";
import { BrevlyLink } from "./brevly-link";

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
            <LinkIcon />
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

/* 
  TODO:
  - Adicionar auto scroll em Y
  - Adicionar cursor disabled quando o botão ta disabled.
*/
export function BrevlyLinkListContainer() {
  return (
    <div className="col-span-2 bg-white rounded-xl p-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-600">Meus links</h2>
        <Button
          className="bg-gray-200 rounded-lg text-gray-600 border-gray-200 border-1 hover:bg-gray-200 hover:border-primary cursor-pointer"
          disabled={true}
        >
          <DownloadSimpleIcon /> Baixar CSV
        </Button>
      </div>
      <hr className="h-1 text-gray-200" />
      <BrevlyLinkList />
    </div>
  );
}
